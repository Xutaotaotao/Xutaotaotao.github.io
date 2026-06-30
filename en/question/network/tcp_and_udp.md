---
outline: deep
title: TCP vs UDP
titleTemplate: Frontend Interview Notes
---

# TCP vs UDP

<img src="/question/network/tcp_and_udp.jpg" width="500" height="520" alt="Diagram comparing TCP and UDP">

## Core concepts

### TCP
TCP, or Transmission Control Protocol, is a connection-oriented and reliable transport-layer protocol. It provides ordered delivery and retransmission when packets are lost.

### UDP
UDP, or User Datagram Protocol, is a lightweight transport-layer protocol that sends independent datagrams without building a connection first.

## Connection and handshake

### TCP
TCP requires a connection before data transfer.

**Three-way handshake**
1. The client sends `SYN`.
2. The server replies with `SYN + ACK`.
3. The client sends `ACK`.

**Four-way termination**
1. The client sends `FIN`.
2. The server replies with `ACK`.
3. The server sends its own `FIN`.
4. The client replies with `ACK`.

### UDP
UDP is connectionless.

- No connection setup
- No teardown
- No handshake
- The sender can send datagrams immediately

## Data transfer and reliability

### TCP
- Splits data into segments
- Tracks sequence numbers and acknowledgements
- Reorders data if needed
- Retransmits lost packets
- Guarantees reliability and ordering

### UDP
- Sends independent datagrams
- No built-in acknowledgement
- No retransmission
- No ordering guarantee
- Reliability, if needed, must be handled at the application layer

## Latency and efficiency

### TCP
- Higher latency because of connection setup, acknowledgements, and retransmission
- More overhead because of flow control, congestion control, and larger headers

### UDP
- Lower latency
- Lower protocol overhead
- Better suited for real-time traffic where timeliness matters more than perfect delivery

## Use cases

### TCP
1. web browsing
2. file upload and download
3. email delivery
4. database communication
5. remote login and management

### UDP
1. real-time audio and video
2. online games
3. DNS queries
4. IoT telemetry
5. SNMP

## Header overhead

### TCP
TCP headers are larger and contain fields such as:

- source port
- destination port
- sequence number
- acknowledgement number
- window size
- flags
- checksum
- optional extension fields

The minimum header size is 20 bytes, and it can grow larger if options are present.

### UDP
UDP keeps a fixed 8-byte header:

- source port
- destination port
- length
- checksum

That simplicity is part of why UDP is fast.

## Summary
TCP trades speed and simplicity for reliability, ordering, and delivery guarantees. UDP trades reliability for lower latency and smaller overhead.

When the workload cannot tolerate lost or out-of-order data, use TCP. When speed matters more than guaranteed delivery, UDP is often the better fit.
