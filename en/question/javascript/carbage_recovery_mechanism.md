---
outline: deep
title: JavaScript Garbage Collection
titleTemplate: Frontend Interview Notes
---

# JavaScript Garbage Collection

<img src="/question/javascript/carbage_recovery_mechanism.jpg" width="500" height="520" alt="Illustration of JavaScript garbage collection">

## Concept

### GC

In JavaScript, `GC` stands for `Garbage Collection`. It is an automatic memory-management mechanism that detects objects that are no longer needed and releases the memory they occupy, helping prevent memory leaks and wasted resources.

JavaScript is a high-level language that creates and destroys objects dynamically at runtime. When an object is created, the engine allocates memory for it. When that object is no longer referenced or used, that memory should be released so it can be reused later. Garbage collection is the mechanism responsible for finding those unused objects and cleaning them up automatically.

A simple way to picture it is to imagine memory as a room filled with all kinds of items. If you want to bring in something new, you first need to clear out the things you no longer need.

The JavaScript engine acts like a housekeeper. It periodically checks which items in the room are no longer being used or can no longer be reached. Those forgotten items are like garbage in memory, so the GC collects them and removes them. Once that happens, space becomes available again for new variables, objects, and other program data.

### Why garbage is produced

1. **Memory gets allocated during execution:** JavaScript programs continuously request memory to store objects, variables, and temporary data. Once that data is no longer needed, it becomes garbage.
2. **Objects are no longer referenced:** Because JavaScript is dynamic, the engine mainly determines whether an object is still useful by checking whether anything still references it. If not, it becomes garbage.
3. **Globals, closures, and circular references:** Global variables, closures, and circular references can sometimes keep memory alive longer than expected, which can turn into memory waste or leaks.
4. **Intermediate runtime state:** Local variables and temporary values created during execution also occupy memory. Once they are no longer needed, they become garbage too.

### Why garbage should be collected

1. **Manage memory usage:** Since JavaScript handles memory allocation and release automatically, it still needs a GC mechanism to reclaim unused memory.
2. **Prevent memory leaks:** Some objects may remain in memory because of references between them. Garbage collection helps detect and release them when they are no longer reachable.
3. **Free memory:** Recovering memory from unnecessary objects makes that space available for later use.
4. **Improve performance:** Releasing unused memory can reduce memory pressure and fragmentation, which helps runtime performance.
5. **Optimize memory allocation:** Garbage collection lets the engine reuse memory more effectively.
6. **Simplify development:** Developers do not need to manually free memory in everyday JavaScript development.
7. **Avoid common low-level mistakes:** Automatic memory management reduces errors such as leaking memory or accessing invalid memory directly.

## Common mechanisms

### Reference counting

Reference counting is one of the earlier garbage-collection strategies used in JavaScript-related runtimes.

**Core idea**

Track how many references point to each object. When the count drops to `0`, the object is considered unused and its memory can be reclaimed.

- every object starts with a reference count of `0`
- when something references it, the count increases
- when a reference is removed, the count decreases
- when the count reaches `0`, the object can be collected

**Pros**

1. Simple to implement and relatively lightweight
2. Memory can be reclaimed immediately
3. Program pause time can be reduced

**Cons**

1. **Circular references:** If two or more objects reference each other, their counts may never reach `0`, even when the program can no longer access them.
2. **Counter maintenance cost:** Every reference add and remove operation updates the counter, which creates overhead.
3. **Limited reachability awareness:** Reference counting does not handle all unreachable cases well beyond the circular-reference problem.

Because of these issues, modern JavaScript engines generally do not rely on pure reference counting as the primary strategy.

### Mark and sweep

Mark-and-sweep is one of the most common garbage-collection mechanisms in JavaScript engines.

**Core idea**

1. **Mark phase:** Start from root objects such as the global object, active call stacks, and closures. Traverse everything reachable and mark those objects as alive.
2. **Sweep phase:** Scan heap memory and reclaim everything that was not marked, since those objects are considered unreachable garbage.

This algorithm works by first determining which objects are still active, then removing the rest.

**Pros**

1. Efficient overall structure with clear mark and sweep stages
2. No need for an extra reference counter on every object
3. Can reclaim unreachable objects directly

**Cons**

1. It can create memory fragmentation
2. Full collection often requires pausing program execution
3. Sweeping requires scanning many objects
4. Performance depends on object count
5. It is less naturally suited to incremental collection

### Mark and compact

Mark-and-compact is an improvement over basic mark-and-sweep.

**Core idea**

1. **Mark phase:** Mark all reachable objects, just like mark-and-sweep.
2. **Compact phase:** Move surviving objects toward one side of memory so they become contiguous.
3. **Cleanup phase:** Reclaim the memory outside the compacted live boundary.

**Pros**

1. Reduces fragmentation
2. Makes future allocations faster
3. Improves memory utilization

**Cons**

Moving surviving objects takes additional time and compute resources. Even so, mark-and-compact is widely used because it improves on the fragmentation problem.

### Generational garbage collection

Generational garbage collection is one of the most important optimizations in modern JavaScript engines.

**Core idea**

Divide objects into generations based on expected lifetime, usually a young generation and an old generation.

- new objects are first allocated in the young generation
- the young generation is collected frequently with fast, small-scale algorithms
- objects that survive enough collections are promoted to the old generation
- the old generation is collected less frequently, but the process is more expensive

This works well because most objects die young. By collecting short-lived objects aggressively and long-lived objects less often, engines improve both performance and memory efficiency.

**Pros**

It chooses collection timing and strategy more precisely based on object lifetime. Short-lived objects can be reclaimed quickly, while long-lived objects avoid unnecessary large-scale collection cycles.

**Cons**

1. **Higher implementation complexity:** The engine has to track object age and manage different strategies for different generations.
2. **More memory overhead:** Additional metadata is required.
3. **Parameter sensitivity:** Generation size and promotion thresholds affect the outcome heavily.
4. **Not a complete solution:** It reduces frequent full-heap collection, but does not eliminate it.
5. **Potential fragmentation:** Separate generational spaces can still produce fragmentation.

### Idle-time garbage collection

Idle-time garbage collection is a common optimization that tries to perform collection work when the system or browser is relatively idle.

**Core idea**

1. The engine monitors execution and detects idle periods.
2. During idle time, it starts collection work and uses otherwise free CPU time.
3. If the program needs CPU time again, GC can pause and let the program continue.
4. Collection work is split across multiple idle gaps.

**Pros**

1. Reduces interference with active code execution
2. Avoids some long blocking pauses
3. Improves user experience by reducing visible jank

**Cons**

Idle-time GC does not mean pauses disappear entirely. In some situations, the runtime still has to perform collection work during active execution. The point is to reduce impact where possible, not to eliminate it completely.

## Summary

Garbage collection is a critical part of JavaScript's automatic memory management. It helps recover unused memory, prevent memory leaks, and keep programs running smoothly.

The main garbage-collection algorithms include reference counting, mark-and-sweep, and mark-and-compact. Modern browsers usually combine multiple strategies. To improve efficiency, engines often use generational collection to distinguish between short-lived and long-lived objects, and they may also use idle-time collection to take advantage of spare CPU time.

Garbage collection still has a performance cost, so we should write code carefully, avoid unnecessary retention, and reduce avoidable memory usage. Overall, GC removes a large amount of low-level memory-management burden from JavaScript developers and is one of the reasons JavaScript remains productive as a dynamic language.
