<p align="center"><br><img src="https://avatars3.githubusercontent.com/u/16580653?v=4" width="128" height="128" /></p>

<h3 align="center">React Hook for capacitor-data-storage-sqlite plugin</h3>
<p align="center"><strong><code>react-data-storage-sqlite-hook</code></strong></p>
<br>
<p align="center">
    <img src="https://img.shields.io/maintenance/yes/2021?style=flat-square" />
    <a href="https://www.npmjs.com/package/react-data-storage-sqlite-hook"><img src="https://img.shields.io/npm/l/react-data-storage-sqlite-hook?style=flat-square" /></a>
<br>
  <a href="https://www.npmjs.com/package/react-data-storage-sqlite-hook"><img src="https://img.shields.io/npm/dw/react-data-storage-sqlite-hook?style=flat-square" /></a>
  <a href="https://www.npmjs.com/package/react-data-storage-sqlite-hook"><img src="https://img.shields.io/npm/v/react-data-storage-sqlite-hook?style=flat-square" /></a>
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
<a href="#contributors-"><img src="https://img.shields.io/badge/all%20contributors-1-orange?style=flat-square" /></a>
<!-- ALL-CONTRIBUTORS-BADGE:END -->
</p>

## Maintainers

| Maintainer        | GitHub                                    | Social |
| ----------------- | ----------------------------------------- | ------ |
| Quéau Jean Pierre | [jepiqueau](https://github.com/jepiqueau) |        |



## Installation

```bash
npm install --save capacitor-data-storage-sqlite
npm install --save-dev react-data-storage-sqlite-hook
```

## Applications demonstrating the use of the plugin and the react hook

### React
 - [react-datastoragesqlite-app] (https://github.com/jepiqueau/react-datastoragesqlite-app)

### Ionic/React
 - [react-data-storage-sqlite-app-starter] (https://github.com/jepiqueau/react-data-storage-sqlite-app-starter)


## Usage
Import the hook from its own path:

```js
 import { useStorageSQLite } from 'react-data-storage-sqlite-hook'
```

Then use the hook from that namespace in your app:

```js

  const [log, setLog] = useState<string[]>([]);

  const {openStore, getItem, setItem, getAllKeys, getAllValues,
    getAllKeysValues, isKey, setTable, removeItem, clear} = useStorageSQLite();
  useEffect(() => {
    async function testSimpleStore() {
      setLog((log) => log.concat("Tab 2 page\n")); 
      const resOpen =  await openStore({});
      if(resOpen) {
        await setItem('name', 'Jeep');
        const val = await getItem('name');
        await setItem('message', 'Hello World from ');
        const mess = await getItem('message');
        if( mess && val ) setLog((log) => log.concat(mess + val + "\n")); 
        const keys = await getAllKeys();
        setLog((log) => log.concat("keys : " + keys.length + "\n"));
        for(let i: number = 0;i< keys.length;i++) {
          setLog((log) => log.concat('key[' + i + "] = " + keys[i] + "\n"));
        }
        const values = await getAllValues();
        setLog((log) => log.concat("values : " + values.length + "\n"));
        for(let i: number = 0;i< values.length;i++) {
          setLog((log) => log.concat('value[' + i + "] = " + values[i] + "\n"));
        }
        const keysvalues = await getAllKeysValues();
        setLog((log) => log.concat("keysvalues : " + keysvalues.length + "\n"));
        for(let i: number = 0;i< keysvalues.length;i++) {
          setLog((log) => log.concat(' key[' + i + "] = " + keysvalues[i].key +
            ' value[' + i + "] = " + keysvalues[i].value  + "\n"));
        }
        const iskey = await isKey('name');
        setLog((log) => log.concat('iskey name ' + iskey + "\n")); 
        const iskey1 = await isKey('foo');
        setLog((log) => log.concat('iskey foo ' + iskey1 + "\n")); 
        const r = await setTable("testtable");
        setLog((log) => log.concat('set table "testtable" result ' + r.result + " message " +
              r.message + "\n")); 
        console.log("r " + r.result + " message " + r.message);
        if(r.result) {
          await setItem('name', 'Jeepq');
          await setItem('email', 'Jeepq@example.com');
          await setItem('tel', '2255443315');
          const name = await getItem('name');
          if( name ) setLog((log) => log.concat(name + "\n")); 
          const email = await getItem('email');
          if( email ) setLog((log) => log.concat(email + "\n")); 
          const tel = await getItem('tel');
          if( tel ) setLog((log) => log.concat(tel + "\n")); 
          const res = await removeItem('tel')
          if( res ) setLog((log) => log.concat("remove tel " + res + "\n")); 
          const iskey = await isKey('tel');
          setLog((log) => log.concat('iskey tel ' + iskey + "\n")); 
            const rClear = await clear();
          if( rClear ) setLog((log) => log.concat('clear table "testtable" ' + res + "\n")); 
        }
      }
    }
    testSimpleStore();
  }, [ openStore, getItem, setItem, getAllKeys, getAllValues,
    getAllKeysValues, isKey, setTable, removeItem, clear]);   
  
```

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/jepiqueau"><img src="https://avatars3.githubusercontent.com/u/16580653?v=4" width="100px;" alt=""/><br /><sub><b>Jean Pierre Quéau</b></sub></a><br /><a href="https://github.com/jepiqueau/react-data-storage-sqlite-hook/commits?author=jepiqueau" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

