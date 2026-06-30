---
outline: deep
title: HTTP vs HTTPS
titleTemplate: Frontend Interview Notes
---

# HTTP vs HTTPS

<img src="/question/network/http_and_https.jpg" width="400" height="420" alt="Mind map comparing HTTP and HTTPS">

## Concepts

- **HTTP (HyperText Transfer Protocol)** is the foundational application-layer protocol used for web communication. It follows a request-response model where the browser sends a request and the server returns a response.
- **HTTPS (HyperText Transfer Protocol Secure)** is the secure version of HTTP. It adds an SSL/TLS layer on top of HTTP so communication can be encrypted, authenticated, and protected against tampering.

## Default ports

- **HTTP** uses port `80` by default.
- **HTTPS** uses port `443` by default.

These ports can be omitted in a URL when the default port is being used.

## Connection model

![Diagram of the HTTPS connection and encryption flow](/images/i18n/http-https-en-flow.svg)

- **HTTP** sends data in plaintext over a TCP connection.
- **HTTPS** first establishes a TLS connection, validates the server certificate, negotiates encryption parameters, and only then sends the HTTP request securely.

## Typical use cases

### HTTP
1. general public content such as blogs or documentation
2. low-risk internal testing environments
3. data that is not sensitive
4. performance-focused scenarios where security is intentionally not required

### HTTPS
1. e-commerce, finance, and payment systems
2. login and identity workflows
3. websites carrying user privacy data
4. management systems and sensitive internal tools
5. any modern public production site where security is expected

## Security

### Confidentiality
- **HTTP** transmits data in plaintext, so it can be intercepted more easily.
- **HTTPS** encrypts data over SSL/TLS, making direct interception far more difficult.

### Integrity
- **HTTP** has no built-in protection against tampering in transit.
- **HTTPS** uses cryptographic mechanisms to ensure that data is not silently modified on the way.

### Authentication
- **HTTP** has no built-in server identity verification.
- **HTTPS** uses certificates and the TLS handshake to verify that the client is talking to the intended server.

### Certificates
- **HTTP** does not use certificates.
- **HTTPS** relies on digital certificates issued by trusted certificate authorities, or by an internal trust chain in private environments.

## Performance

### Handshake and encryption cost
- **HTTP** avoids encryption overhead, so the connection setup is simpler.
- **HTTPS** adds TLS negotiation and encryption cost, especially on the first connection.

That said, modern hardware, TLS optimizations, and connection reuse have made this overhead much smaller than it used to be.

### Caching
- **HTTP** can be cached easily by browsers and intermediary proxies.
- **HTTPS** can also be cached, but some intermediary caching behavior is more constrained because the traffic is encrypted.

### HTTP/2 and multiplexing
- **HTTP/1.1** is more vulnerable to request serialization issues and older connection constraints.
- **HTTPS** is commonly paired with HTTP/2 or newer protocols, which support multiplexing and better concurrency.

### CDN and optimization
Both protocols can benefit from caching, CDN placement, compression, and transport optimization. In practice, modern performance optimization is fully compatible with HTTPS.

## Summary
HTTP is simpler, but it is no longer the right default for public-facing systems. HTTPS provides confidentiality, integrity, and authentication, which makes it the standard for modern web delivery.

If the question is which one you should use in a real product, the answer is almost always HTTPS.
