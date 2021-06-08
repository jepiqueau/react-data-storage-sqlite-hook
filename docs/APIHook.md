<p align="center"><br><img src="https://user-images.githubusercontent.com/236501/85893648-1c92e880-b7a8-11ea-926d-95355b8175c7.png" width="128" height="128" /></p>
<h2 align="center">API HOOK DOCUMENTATION</h2>
<p align="center"><strong><code>react-data-storage-sqlite-hook</code></strong></p>
<br>
<p align="center"><strong><code>Capacitor 3</code></strong></p>
<br>
<p align="center">
  A React Hook to help Capacitor developpers to use <strong><code>capacitor-data-storage-sqlite</code></strong> plugin in React or Ionic/React applications</p>


## Methods Index

<docgen-index>

* [`echo(...)`](#echo)
* [`getPlatform()`](#getplatform)
* [`openStore(...)`](#openstore)
* [`closeStore(...)`](#closestore)
* [`isStoreOpen(...)`](#isstoreopen)
* [`isStoreExists(...)`](#isstoreexists)
* [`deleteStore(...)`](#deletestore)
* [`setTable(...)`](#settable)
* [`getItem(...)`](#getitem)
* [`setItem(...)`](#setitem)
* [`removeItem(...)`](#removeitem)
* [`clear()`](#clear)
* [`isKey(...)`](#iskey)
* [`getAllKeys()`](#getallkeys)
* [`getAllValues()`](#getallvalues)
* [`getFilterValues(...)`](#getfiltervalues)
* [`getAllKeysValues()`](#getallkeysvalues)
* [`isTable(...)`](#istable)
* [`getAllTables()`](#getalltables)
* [`deleteTable(...)`](#deletetable)

</docgen-index>

## API Hook

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### echo(...)

```typescript
echo(value: string) => Promise<{ value: string; }>
```

| Param       | Type                |
| ----------- | ------------------- |
| **`value`** | <code>string</code> |

**Returns:** <code>Promise&lt;{ value: string; }&gt;</code>

**Since:** 1.0.0

--------------------


### getPlatform()

```typescript
getPlatform() => Promise<{ platform: string; }>
```

Get platform

**Returns:** <code>Promise&lt;{ platform: string; }&gt;</code>

**Since:** 1.0.0

--------------------


### openStore(...)

```typescript
openStore(options: { database?: string; table?: string; encrypted?: boolean; mode?: string; }) => Promise<void>
```

Open a store

| Param         | Type                                                                                    | Description                                                               |
| ------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| **`options`** | <code>{ database?: string; table?: string; encrypted?: boolean; mode?: string; }</code> | : {database?: string, table?: string, encrypted?: boolean, mode?: string} |

**Since:** 0.0.1

--------------------


### closeStore(...)

```typescript
closeStore(database: string) => Promise<void>
```

Close a store

| Param          | Type                | Description |
| -------------- | ------------------- | ----------- |
| **`database`** | <code>string</code> | : string    |

**Since:** 1.0.0

--------------------


### isStoreOpen(...)

```typescript
isStoreOpen(database: string) => Promise<boolean>
```

Check if a store is open

| Param          | Type                | Description |
| -------------- | ------------------- | ----------- |
| **`database`** | <code>string</code> | : string    |

**Returns:** <code>Promise&lt;boolean&gt;</code>

**Since:** 1.0.0

--------------------


### isStoreExists(...)

```typescript
isStoreExists(database: string) => Promise<boolean>
```

Check if a store exists

| Param          | Type                | Description |
| -------------- | ------------------- | ----------- |
| **`database`** | <code>string</code> | : string    |

**Returns:** <code>Promise&lt;boolean&gt;</code>

**Since:** 1.0.0

--------------------


### deleteStore(...)

```typescript
deleteStore(database: string) => Promise<void>
```

Delete a store

| Param          | Type                | Description |
| -------------- | ------------------- | ----------- |
| **`database`** | <code>string</code> | : string    |

**Since:** 0.0.1

--------------------


### setTable(...)

```typescript
setTable(table: string) => Promise<void>
```

Set or Add a table to an existing store

| Param       | Type                |
| ----------- | ------------------- |
| **`table`** | <code>string</code> |

**Since:** 0.0.1

--------------------


### getItem(...)

```typescript
getItem(key: string) => Promise<string | null>
```

Retrieve a data value for a given data key

| Param     | Type                |
| --------- | ------------------- |
| **`key`** | <code>string</code> |

**Returns:** <code>Promise&lt;string | null&gt;</code>

**Since:** 0.0.1

--------------------


### setItem(...)

```typescript
setItem(key: string, value: string) => Promise<void>
```

Store a data with given key and value

| Param       | Type                | Description |
| ----------- | ------------------- | ----------- |
| **`key`**   | <code>string</code> | : string    |
| **`value`** | <code>string</code> | : string    |

**Since:** 0.0.1

--------------------


### removeItem(...)

```typescript
removeItem(key: string) => Promise<void>
```

Remove a data with given key

| Param     | Type                | Description |
| --------- | ------------------- | ----------- |
| **`key`** | <code>string</code> | : string    |

**Since:** 0.0.1

--------------------


### clear()

```typescript
clear() => Promise<void>
```

Clear the Data Store (delete all keys)

**Since:** 0.0.1

--------------------


### isKey(...)

```typescript
isKey(key: string) => Promise<boolean>
```

Check if a data key exists

| Param     | Type                | Description |
| --------- | ------------------- | ----------- |
| **`key`** | <code>string</code> | : string    |

**Returns:** <code>Promise&lt;boolean&gt;</code>

**Since:** 0.0.1

--------------------


### getAllKeys()

```typescript
getAllKeys() => Promise<string[]>
```

Get the data key list

**Returns:** <code>Promise&lt;string[]&gt;</code>

**Since:** 0.0.1

--------------------


### getAllValues()

```typescript
getAllValues() => Promise<string[]>
```

Get the data value list

**Returns:** <code>Promise&lt;string[]&gt;</code>

**Since:** 0.0.1

--------------------


### getFilterValues(...)

```typescript
getFilterValues(filter: string) => Promise<string[]>
```

Get the data value list for filter keys

| Param        | Type                | Description |
| ------------ | ------------------- | ----------- |
| **`filter`** | <code>string</code> | : string    |

**Returns:** <code>Promise&lt;string[]&gt;</code>

**Since:** 0.0.2

--------------------


### getAllKeysValues()

```typescript
getAllKeysValues() => Promise<any[]>
```

Get the data key/value pair list

**Returns:** <code>Promise&lt;any[]&gt;</code>

**Since:** 0.0.1

--------------------


### isTable(...)

```typescript
isTable(table: string) => Promise<boolean>
```

Check if a table exists

| Param       | Type                | Description |
| ----------- | ------------------- | ----------- |
| **`table`** | <code>string</code> | : string    |

**Returns:** <code>Promise&lt;boolean&gt;</code>

**Since:** 1.0.0

--------------------


### getAllTables()

```typescript
getAllTables() => Promise<string[]>
```

Get the table list for the current store

**Returns:** <code>Promise&lt;string[]&gt;</code>

**Since:** 1.0.0

--------------------


### deleteTable(...)

```typescript
deleteTable(table: string) => Promise<void>
```

Delete a table

| Param       | Type                | Description |
| ----------- | ------------------- | ----------- |
| **`table`** | <code>string</code> | : string    |

**Since:** 1.0.0

--------------------

</docgen-api>
