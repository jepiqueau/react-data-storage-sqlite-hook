import { renderHook, act } from '@testing-library/react-hooks'
import { useStorageSQLite } from './useStorageSQLite';

const isJsonValid = async (jsonObj: any): Promise<boolean> => {
    const keyFirstLevel: string[] = ['database', 'encrypted', 'tables'];
    const keyTableLevel: string[] = ['name', 'values'];
    const keyValueLevel: string[] = ['key', 'value'];
    const keys: string[] = Object.keys(jsonObj);
    for (const key of keys) {
        if (keyFirstLevel.indexOf(key) === -1) return false;
        if( key === "tables") {
            for (const table of jsonObj.tables) {
                const tkeys: string[] = Object.keys(table);
                for (const tkey of tkeys) {
                    if (keyTableLevel.indexOf(tkey) === -1) return false;

                    if(tkey === "values") {
                        for (const value of table.values) {
                            const vKeys: string[] = Object.keys(value);
                            for (const vkey of vKeys) {
                                if (keyValueLevel.indexOf(vkey) === -1) return false;
                            }
                        }
                    }
                }
            }
        }
    }
    return true;

}

jest.mock('@capacitor/core', () => {
      return {
        Capacitor: {
        isPluginAvailable: () => true,
        getPlatform: () => 'ios',
        platform: 'ios'
      }
    }
});

jest.mock('capacitor-data-storage-sqlite', () => {
    let mDatabases: any = {};
    let curDatabase: string = "";
    let curTable: string = "";
    let mJsonObject: any = {};
    return {
        CapacitorDataStorageSqlite: {
            openStore: async (options: any) => {
                const database = options.database ? options.database : "storage"; 
                const table: string = options.table ? options.table : "storage_table";
                const encrypted: boolean = options.encrypted ? options.encrypted : false;
                const mode:string = options.mode ? options.mode : "no-encryption";
                if (!Object.keys(mDatabases).toString().includes(database)) {
                    let mTables: any = {};
                    let mData: any = {};
                    mTables[table] = mData;
                    mDatabases[database] = mTables; 
                } else if (!Object.keys(mDatabases[database]).toString().includes(table)) {
                    let mTables = mDatabases[database];
                    let mData: any = {};
                    mTables[table] = mData;
                    mDatabases[database] = mTables; 
                }
                curDatabase = database;
                curTable = table;
                return;             
            },
            setTable: async ({ table }: { table: string }) => { 
                if (!Object.keys(mDatabases[curDatabase]).toString().includes(table)) { 
                    let mTables = mDatabases[curDatabase];
                    let mData: any = {};
                    mTables[table] = mData;
                    mDatabases[curDatabase] = mTables; 
                }
                curTable = table;
                return;             
            },
            get: async ({ key }: { key: string }) => { 
                try {
                    const value = mDatabases[curDatabase][curTable][key];  
                    return {value: value};
                }
                catch {
                    return null;
                }             
            },
            set: async ({ key, value }: { key: string, value: string }): Promise<void> => {
                mDatabases[curDatabase][curTable][key] = value;
                return;
            },
            remove: async ({ key }: { key: string }) => {
                try {
                    delete mDatabases[curDatabase][curTable][key];
                    return;             
                }
                catch {
                    return;             
                }
            },
            clear: async () => {
                try {
                    delete mDatabases[curDatabase][curTable];
                    curTable = "";
                    return {result: true};             
                }
                catch {
                    return {result: false};             
                }
            },
            iskey: async({ key }: { key: string }) => {
                const result = Object.keys(mDatabases[curDatabase][curTable]).toString().includes(key);
                return {result: result};
            },
            keys: async () => {
                try {
                    const result = Object.keys(mDatabases[curDatabase][curTable]);
                    return {keys: result};
                }
                catch {
                    return {keys: null};
                }
            },
            values: async () => {
                try {
                    const result = Object.values(mDatabases[curDatabase][curTable]);
                    return {values: result};
                }
                catch {
                    return {values: null};
                }
            },
            keysvalues: async () => {
                try {
                    let result: Array<{key: string, value:string}> = [];
                    const keys = Object.keys(mDatabases[curDatabase][curTable]);
                    keys.forEach((key) => {
                        const value: string = mDatabases[curDatabase][curTable][key];
                        result = [...result,{key: key, value: value} ];
                    });
                    return {keysvalues: result};
                }
                catch {
                    return {keysvalues: null};
                }
            },
            deleteStore: async (options: any) => {
                const database = options.database ? options.database : "storage";
                if (!Object.keys(mDatabases).includes(database)) {
                    return Promise.reject(`${database} does not exist`);
                }

                delete mDatabases[database];
                if (database === curDatabase) curDatabase = "";
                return;
            },
            isJsonValid: async ({jsonstring}: { jsonstring: string }) => {
                const jsonString: string = jsonstring;
                const jsonObj: any = JSON.parse(jsonString);
                const retB: boolean = await isJsonValid(jsonObj);
                return {result: retB};
            },
            importFromJson: async ({jsonstring}: { jsonstring: string }) => {
                const jsonString: string = jsonstring;
                mJsonObject = JSON.parse(jsonString);
                const retB: boolean = await isJsonValid(mJsonObject);
                if( retB) {
                    let totChanges: number = 0;
                    for( const table of mJsonObject.tables) {
                        totChanges += table.values.length;
                    }
                    return {changes: totChanges};
                } else {
                    return {message: "Must provide a valid JsonSQLite Object"};
                }
            },
            exportToJson: async () => {
                return {export: mJsonObject};
            },
        }
    }
});


it('Gets and sets storage values from default', async () => {
    const r = renderHook(() => useStorageSQLite());
  
    await act(async () => {
      const result = r.result.current;
      const { isAvailable } = result;
      expect(isAvailable).toBe(true);
    });
    await act(async () => {
        const result = r.result.current;
    
        const { openStore, setTable, getItem, setItem, removeItem, clear,
        isKey, getAllKeys, getAllValues, getAllKeysValues, deleteStore} = result;
        try {
            await openStore({});
     
            await setItem('name', 'Max');
    
            let name = await getItem('name');
            expect(name).toEqual('Max');
            let res = await isKey('name');
            expect(res).toBe(true);
            await removeItem('name');
            name = await getItem('name');
        } catch(err) {
            expect(err).toEqual("no returned value for key name");
        }
        try {
            let res = await isKey('name');
            expect(res).toBe(false);
            await setItem('name', 'Jeep');
            await setItem('session', 'Opened');
            await setItem('email', 'jeep@example.com');
            const keys = await getAllKeys();
            expect(keys.length).toEqual(3);
            expect(keys).toStrictEqual(['name','session','email']);
            const values = await getAllValues();
            expect(values.length).toEqual(3);
            expect(values).toStrictEqual(['Jeep','Opened','jeep@example.com']);
            const keysvalues = await getAllKeysValues();
            expect(keysvalues.length).toEqual(3);
            expect(keysvalues).toStrictEqual([{key:'name',value:'Jeep'},{key:'session',value:'Opened'},{key:'email',value:'jeep@example.com'}]);
            await clear();
            await getItem('name');
        } catch(err) {
            expect(err).toEqual("no returned value for key name");
            
        }
        try {
            await deleteStore({});
            await deleteStore({database:"foo"});
        } catch (err) {
            expect(err).toEqual("foo does not exist");
        }
    });
});  
it('Gets and sets storage values from "myTest" Store & "myStore" Table', async () => {
    const r = renderHook(() => useStorageSQLite());
    
    await act(async () => {
        const result = r.result.current;
        const { isAvailable } = result;
        expect(isAvailable).toBe(true);
    });
    await act(async () => {
        const result = r.result.current;
    
        const { openStore, setTable, getItem, setItem, removeItem, clear,
        isKey, getAllKeys, getAllValues, getAllKeysValues, deleteStore} = result;
        try {
            await openStore({database: 'myTest', table: 'myStore'});    
            await setItem('name', 'Max');

            let name = await getItem('name');
            expect(name).toEqual('Max');
        
            await removeItem('name');
            name = await getItem('name');
        } catch(err) {
            expect(err).toEqual("no returned value for key name");
        }
        try {
            await setItem('name', 'Jeep');
            await clear();
            let name = await getItem('name');
        } catch(err) {
            expect(err).toEqual("no returned value for key name");
        }
    }); 
}); 
it('Gets and sets storage values from one store & two tables', async () => {
    const r = renderHook(() => useStorageSQLite());
    
    await act(async () => {
        const result = r.result.current;
        const { isAvailable } = result;
        expect(isAvailable).toBe(true);
    });
    await act(async () => {
        const result = r.result.current;
    
        const { openStore, setTable, getItem, setItem, removeItem, clear,
        isKey, getAllKeys, getAllValues, getAllKeysValues, deleteStore} = result;
        try {
            await openStore({database: 'myTest', table: 'myStore'});
    
            await setItem('name', 'Max');
            let name = await getItem('name');
            expect(name).toEqual('Max');
    
            await removeItem('name');
            name = await getItem('name');
        } catch(err) {
            expect(err).toEqual("no returned value for key name");
        }
        try {
    
            await setItem('name', 'Jeep');
            await setItem('email', 'jeep@example.com');
            let name = await getItem('name');
            let email = await getItem('email');
            expect(name).toEqual('Jeep');
            expect(email).toEqual('jeep@example.com');
            await setTable('second');
            await setItem('session', 'Opened');
            await setItem('json', JSON.stringify({a: 5,b: 362.235,c:"hello World!"}));
            let session = await getItem('session');
            expect(session).toEqual('Opened');
            let jsonString = await getItem('json');
            if(jsonString != null) {
                let json = JSON.parse(jsonString);
                expect(json.a).toEqual(5);
                expect(json.b).toEqual(362.235);
                expect(json.c).toEqual("hello World!");    
            }
            await setTable('myStore');
            await setItem('mobile', '0123456789');
            let mobile = await getItem('mobile');
            expect(mobile).toEqual('0123456789');
            const keysvalues = await getAllKeysValues();
            expect(keysvalues.length).toEqual(3);
            expect(keysvalues).toStrictEqual([{key:'name',value:'Jeep'},{key:'email',value:'jeep@example.com'},{key:'mobile',value:'0123456789'}]);
        } catch {
        }

    }); 
}); 
it('Gets and sets storage values Json Object', async () => {
    const r = renderHook(() => useStorageSQLite());
    const jsonData1 = {
        database: "testImport",
        encrypted: false,
        tables: [
          {
            name: "myStore1",
            values: [
              {key: "test1", value: "my first test"},
              {key: "test2", value: JSON.stringify({a: 10, b: 'my second test', c:{k:'hello',l: 15}})},
            ]
          },
          {
            name: "myStore2",
            values: [
              {key: "test1", value: "my first test in store2"},
              {key: "test2", value: JSON.stringify({a: 20, b: 'my second test in store2 ', d:{k:'hello',l: 15}})},
              {key: "test3", value: "100"},
            ]
          },
        ]
    }
  
    
    await act(async () => {
        const result = r.result.current;
        const { isAvailable } = result;
        expect(isAvailable).toBe(true);
    });

    await act(async () => {
        const result = r.result.current;
    
        const { openStore, setTable, getAllKeysValues, isJsonValid,
                importFromJson, exportToJson} = result;
        let retB = await isJsonValid(JSON.stringify(jsonData1));
        expect(retB).toBe(true);
        let retChanges = await importFromJson(JSON.stringify(jsonData1));
        expect(retChanges).toEqual(5);
        let retJsonObject = await exportToJson();
        expect(JSON.stringify(retJsonObject)).toStrictEqual(JSON.stringify(jsonData1));
    }); 
}); 
 
 


