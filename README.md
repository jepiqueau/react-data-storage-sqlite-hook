<p align="center"><br><img src="https://avatars3.githubusercontent.com/u/16580653?v=4" width="128" height="128" /></p>

<h3 align="center">React Hook for capacitor-data-storage-sqlite plugin</h3>
<p align="center"><strong><code>react-data-storage-sqlite-hook</code></strong></p>
<br>
<p align="center" style="font-size:50px;color:red"><strong>CAPACITOR 3</strong></p><br>
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
import { Dialog } from '@capacitor/dialog';
```

Then use the hook from that namespace in your app:

```js

  const [log, setLog] = useState<string[]>([]);
  const errMess = useRef("");
  const showAlert = async (message: string) => {
      await Dialog.alert({
        title: 'Error Dialog',
        message: message,
      });
  };

  const {echo, getPlatform, openStore, closeStore, isStoreOpen,
        isStoreExists, deleteStore, getItem, setItem, getAllKeys,
        getAllValues, getFilterValues, getAllKeysValues, isKey,
        setTable, removeItem, clear, isTable, getAllTables, deleteTable,
        isJsonValid, importFromJson, exportToJson, isAvailable} = useStorageSQLite();
  useEffect(() => {
    const testSimpleStore= async (): Promise<boolean> => {
      setLog((log) => log.concat("* Tab 2 Page Start Test\n")); 
      try {

        await openStore({});
        await setItem('name', 'Jeep');
        const val = await getItem('name');
        await setItem('message', 'Hello World from ');
        const mess = await getItem('message');
        if( mess && val ) setLog((log) => log.concat(" > " + mess + " " + val + "\n")); 

        const keys = await getAllKeys();
        setLog((log) => log.concat(" > keys : " + keys.length + "\n"));
        for(let i: number = 0;i< keys.length;i++) {
          setLog((log) => log.concat(' >> key[' + i + "] = " + keys[i] + "\n"));
        }
        let values: string[] = await getAllValues();
        setLog((log) => log.concat(" > values : " + values.length + "\n"));
        for(var i in values) {
          // eslint-disable-next-line no-loop-func
          setLog((log) => log.concat(` >> value[${i}] = ${values[i]} \n`));
        }
        const keysvalues = await getAllKeysValues();
        setLog((log) => log.concat(" > keysvalues : " + keysvalues.length + "\n"));
        for(let i: number = 0;i< keysvalues.length;i++) {
          setLog((log) => log.concat(' >> key[' + i + "] = " + keysvalues[i].key +
            ' value[' + i + "] = " + keysvalues[i].value  + "\n"));
        }
        let iskey: boolean = await isKey('name');
        setLog((log) => log.concat(` > iskey name ${iskey} \n`)); 
        const iskey1 = await isKey('foo');
        setLog((log) => log.concat(` > iskey foo ${iskey1}\n`)); 
        await setTable("testtable");
        setLog((log) => log.concat(` > set table "testtable" result \n`)); 
        await setItem('name', 'Jeepq');
        await setItem('email', 'Jeepq@example.com');
        await setItem('tel', '2255443315');
        const name = await getItem('name');
        if( name != null ) setLog((log) => log.concat(" > " + name + "\n")); 
        const email = await getItem('email');
        if( email != null ) setLog((log) => log.concat(" > " + email + "\n")); 
        const tel = await getItem('tel');
        if( tel != null ) setLog((log) => log.concat(" > " + tel + "\n")); 
        await removeItem('tel')
        setLog((log) => log.concat(` > remove tel \n`)); 
        iskey = await isKey('tel');
        setLog((log) => log.concat(' > iskey tel ' + iskey + "\n")); 
        await clear();
        setLog((log) => log.concat(` > clear table "testtable" \n`)); 
        // store data to test getFilterValues
        await setItem("session","Session Lowercase Opened");
        const data = {'a':20,'b':'Hello World','c':{'c1':40,'c2':'cool'}};
        await setItem("testJson",JSON.stringify(data));
        await setItem("Session1","Session Uppercase 1 Opened");
        await setItem("MySession2foo","Session Uppercase 2 Opened");
        const data1 = 243.567;
        await setItem("testNumber",data1.toString());
        await setItem("Mylsession2foo","Session Lowercase 2 Opened");
        await setItem("EnduSession","Session Uppercase End Opened");
        await setItem("Endlsession","Session Lowercase End Opened");
        await setItem("SessionReact","Session React Opened");
        // Get All Values
        values = await getAllValues();
        if(values.length !== 9) {
          setLog((log) => log.concat(" > getAllValues failed \n"));
        } else {
          for(let i = 0; i< values.length;i++) {
            setLog((log) => log.concat(' key[' + i + "] = " + values[i] + "\n"));
          }
          setLog((log) => log.concat(" > getAllValues was successful \n"));
        }
        // Get Filter Values Starting with "session"
        const stValues: string[] = await getFilterValues("%session");
        if(stValues.length !== 3) {
          setLog((log) => log.concat(" > getFilterValues Start failed \n"));
        } else {
          for(let i = 0; i< stValues.length;i++) {
            setLog((log) => log.concat(' >> key[' + i + "] = " + stValues[i] + "\n"));
          }
          setLog((log) => log.concat(" > getFilterValues Start was successful \n"));
        }
        // Get Filter Values Ending with "session"
        const endValues: string[] = await getFilterValues("session%");
        if(endValues.length !== 3) {
          setLog((log) => log.concat(" > getFilterValues End failed \n"));
        } else {
          for(let i = 0; i< endValues.length;i++) {
            setLog((log) => log.concat(' >> key[' + i + "] = " + endValues[i] + "\n"));
          }
          setLog((log) => log.concat(" > getFilterValues End was successful \n"));
        }
        // Get Filter Values Containing "session"
        const contValues: string[] = await getFilterValues("session");
        if(contValues.length !== 7) {
          setLog((log) => log.concat(" > getFilterValues Contain failed \n"));
          setLog((log) => log.concat("* Tab 2 Page End Test failed\n")); 
        } else {
          for(let i = 0; i< contValues.length;i++) {
            setLog((log) => log.concat(' >> key[' + i + "] = " + contValues[i] + "\n"));
          }
          setLog((log) => log.concat(" > getFilterValues Contain was successful \n"));
        }
        const platform = await getPlatform();
        if(platform.platform !== "web") {
          let isStore = await isStoreExists({})
          setLog((log) => log.concat(` > isStoreExists ${isStore} \n`));
          if(!isStore) {
            errMess.current = `isStoreExists 1 failed`;
            return false;
          }
          const isOpen = await isStoreOpen({})
          setLog((log) => log.concat(` > isStoreOpen ${isOpen} \n`));
          if(!isOpen) {
            errMess.current = `isStoreOpen failed`;
            return false;
          }
          let isTableExists = await isTable({table: "testtable"})
          setLog((log) => log.concat(` > isTableExists ${isTableExists} \n`));
          if(!isTableExists) {
            errMess.current = `isTable 1  failed`;
            return false;
          }
          const tables: string[] = await getAllTables();
          setLog((log) => log.concat(` > getAllTables ${tables.length} \n`));
          await deleteTable({table: "testtable"});
          isTableExists = await isTable({table: "testtable"})
          setLog((log) => log.concat(` > isTableExists ${isTableExists} \n`));
          if(isTableExists) {
            errMess.current = `isTable 2 failed`;
            return false;
          }
          await closeStore({});
          await deleteStore({});
          console.log("after deleteStore")
          isStore = await isStoreExists({})
          console.log("after isStoreExists")
          if(isStore) {
            errMess.current = `isStoreExists 2 failed`;
            return false;
          }

        }
        setLog((log) => log.concat("* Tab 2 Page End Test successful\n")); 
        return true;
      } catch (err) {
        errMess.current = `${err.message}`;
        return false;
      }
    }
    if (isAvailable) {
      testSimpleStore().then(async res => {
        if(res) {    
            setLog((log) => log
                .concat("\n* The set of tests was successful *\n"));
        } else {
            setLog((log) => log
                .concat("\n* The set of tests failed *\n"));
            await showAlert(errMess.current);
        }
      });
    } else {
      getPlatform().then((ret: { platform: string; })  =>  {
        setLog((log) => log.concat("\n* Not available for " + 
                            ret.platform + " platform *\n"));
      });          
    }
  }, [ echo, getPlatform, openStore, closeStore, isStoreOpen, isStoreExists,
    deleteStore, getItem, setItem, getAllKeys, getAllValues,
    getFilterValues, getAllKeysValues, isKey, setTable,
    removeItem, clear, isTable, getAllTables, deleteTable,
    isJsonValid, importFromJson, exportToJson, isAvailable, errMess]);   
  
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

