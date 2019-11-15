import React from 'react';
import Sidebar from './Sidebar';
import VirtualMemory from './resources/VM.png';
import KernelMemory from './resources/Kernel_Vm.png';

class VM extends React.Component {
    render() {
        return (
            <div>
                <div className="menu-item">
                    <Sidebar />
                </div>
                <div className="text-wrapper">
                    <header className="Headers">Virtual memory</header>
                    <p>Virtual Memory (VM) is a storage concept that is supported in most common computers nowadays.
                       It describes the actual storage available for a process independent from its address
                       space. On the other hand, every computer also have the physical memory which describes the actual storage size available
                       from all resources like RAM, disk and others.
                       </p>
                       <div className="SubHeader">
                            <p>Motivation and benefits</p>
                        </div>
                        <p> motivation for VM was the abstraction of storage adresses. For the process, it does not matter
                        which resource it saves the data in. In addition, VM also provides a security mechanism as
                        processes are separated among each other and no process can access storage of the others.
                    </p>
                    <img className="Picture" src={VirtualMemory} alt="VM"></img>
                    <p>
                        The biggest advantage of VM is the increase of memory space. Before the introduction of VM, every process
                        has a static or dynamic range of storage depending on the system (buddy system, static partition, dynamic
                        partition etc.).
                        If the RAM is full, there will be no more space left for a process to allocate memory and the system crashed.
                        VM allows the user to allocate a logical address space (i.e. 32Bit system = 0 - 2<sup>32-1</sup>)
                        where every process has access to. The process doesn't care whether the data is stored in the RAM or disk.
                        Another advantage of VM is the possibility to assign every process an own
                        unfragmented memory range. As a result, VM avoids fragmentation of the address space by other processes.
                        </p>
                        <div className="SubHeader">
                            <p>How does virtual memory work?</p>
                        </div>
                        <p>Virtual Memory are handled by paging and segmentation. A program accesses memory in these following steps: <br></br>
                        1. The  program executes a load with a virtual address.  <br></br>
                        2. The computer translate the address to the physical address in memory.  <br></br>
                        3. If the physical address is not in memory, the OS loads it in from disk.  <br></br>
                        4. The computer then reads the RAM using the physical address and returns the data to the program  <br></br>
                        </p>
                        <div className="SubHeader">
                            <p>Pages</p>
                        </div>
                        <p>Pages are blocks of consistent size. They serve as a transport medium between virtual and physical memory.
                        The physical memory is separated in frames which have the same size of pages to make it easier to load 
                        pages in it.
                        A page table maps virtual to physical addresses. One Page Table Entry (PTE) maps a range of
                        addresses. Hence, fewer PTE needed to cover the whole address space. Today, typically 4kB pages
                        (1024 pages per page) and sometimes, 2MB per page (524,288 words per pages).
                        A page fault occurs when a virtual address points to the disk storage. As such, the CPU generates a page fault. 
                        The OS then chooses a page to evict from RAM and write to disk. If the page is dirty, it will be written to the 
                        disk first. It then chooses the page in the disk and puts it into RAM. The OS then changes the page table to 
                        map the new page. It has to be said that paging is very slow and this plays a significant role in the attack.
                        </p>
                        <div className="SubHeader">
                            <p>Kernel memory</p>
                        </div>
                        <p>The following figure describes how kernel memory is saved in the physical memory and how VM is mapped into 
                        it.</p>
                        <div>
                            <p><img className="Picture3" src={KernelMemory} alt="Kernel Memory"></img></p>
                        </div>
                        <p>Kernel memory is shown in red. It is contained in physical address range 0–99. Kernel memory is
                        special memory that only the operating system should be able to access and user programs should not be able 
                        to access it. <br></br><br></br>
                        User memory is shown in grey. <br></br><br></br>
                        Unallocated physical memory is shown in blue. User memory in each process is in the virtual range 0–99 but
                         backed by different physical memory. Kernel memory in each process is in the virtual range 100–199 but backed by the same physical memory.
                        Even though kernel memory is mapped into each user process, a process running in user mode
                        cannot access the kernel memory. If a process attempts to do so, it will trigger a page fault and the
                        operating system will terminate it.
                        However, when the process is running in kernel mode (for example during a system call), the
                        processor will be allowed to access the kernel memory.</p>
                        <div className="SubHeader">
                            <p>Virtual, logical and physical addresses</p>
                        </div>
                        <p>Logical address is address generated by CPU during execution whereas Physical Address refers to
                        location in memory unit (the one that is loaded into memory). The user deals with only logical 
                        address (Virtual address). The logical address undergoes translation by the Memory Management Unit (MMU) 
                        or address translation unit. The output of this process is the appropriate physical address or the 
                        location of code/data in RAM. The addresses are bind in 3 different ways – compile time, load time 
                        or execution time.<br></br><br></br>
                        1. Compile time – if it is known where process will reside, physical address will be embedded to 
                        the executable of the program <br></br>
                        2. Load time – If it is not known where the process will reside, relocatable address is 
                        generated which if translated by the Loader. Base address of the process is added to all 
                        logical addresses by the loader to generate absolute addresses. <br></br>
                        3. Execution time – instructions are in memory and processed by CPU. Additional memory may be
                        allocated or deallocated. E.g. Compacting.
                    </p>
                </div>
            </div>
        )
    }
}

export default VM;