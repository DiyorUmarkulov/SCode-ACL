# SCode ACL

**SCode** is a lightweight and efficient ACL formatter and encoder. It compresses access permissions into a compact string form, allowing fast parsing, comparison, and secure schema tracking.

Supports both **Flat** and **Nested** schemas.

## 🔧 Installation

```bash
npm install scode-acl
```

## 🚀 Features

- 🔐 Flat & Nested schema encoding
- ⚡ Extremely compact access string format ("0 2 5" or "1.2.3")
- 🧩 Schema hash verification (CRC32 or SHA256)
- 📦 Lightweight — zero runtime dependencies
- 💡 Fully typed and extendable (TypeScript)

## 📦 Quick Start

### Flat Mode

```ts
import { createFlatSCode } from "scode-acl";

const schema = ["user.create", "user.update", "order.cancel"];

const flat = createFlatSCode(schema);

const { access, schemaHash } = flat.encodeAccess([
  "user.create",
  "order.cancel",
]);
// access: "0 2"

flat.hasAccess("order.cancel", access); // true

const permissions = flat.parseAccess(access);
// -> ["user.create", "order.cancel"]
```

### Nested Mode

```ts
import { createNestedSCode } from "scode-acl";

const schema = {
  user: {
    profile: ["read", "update"],
  },
  order: {
    delivery: ["start", "cancel"],
  },
};

const nested = createNestedSCode(schema);

const encoded = nested.encodeAccess({
  user: {
    profile: { read: true },
  },
});
// encoded.access: "0.0.0"

nested.hasAccess("user.profile.read", encoded.access); // true

const result = nested.parseAccess(encoded.access);
// -> ["user.profile.read"]
```

## ✅ Schema Hash Validation

```ts
flat.validateHash(schemaHash); // Throws if schema has changed
```

You can use either:

- `crc32` (default): short and fast
- `sha256`: for cryptographic integrity

## 🔀 Factory Wrapper

```ts
import { createSCode } from 'scode-acl';

const formatter = createSCode({
  mode: "nested",
  schema: { ... },
  hashAlgorithm: "crc32" // optional
});
```

## 🤖 Use Cases

- Dynamic role/action permission encoding
- Compact access storage in sessions or tokens
- Fast permission checks on the frontend or backend
- Version-aware access control

## 🧠 Why SCode?

Compared to traditional JSON-based ACL storage:

| Feature           | SCode ACL      | Traditional ACL  |
| ----------------- | -------------- | ---------------- |
| Size              | Minimal        | Large JSON       |
| Comparison Speed  | O(1) via index | O(n) deep check  |
| Schema Versioning | Built-in hash  | Manual/versioned |
| Frontend storage  | ✅ Tiny        | 🚫 Heavy         |

## 📄 License

MIT
