//Inspired from https://github.com/capacitor-community/react-hooks/blob/master/src/storage/

import { useCallback } from 'react';
import { Capacitor} from '@capacitor/core';
import { AvailableResult, notAvailable } from './util/models';
import { isFeatureAvailable, featureNotAvailableError } from './util/feature-check';
import { CapacitorDataStorageSqlite, JsonStore } from 'capacitor-data-storage-sqlite';


export interface StorageSQLiteHook extends AvailableResult {
    /**
     *
     * @param options: {value:string}
     * @return Promise<{value:string}>
     * @since 1.0.0
     */
    echo(value: string): Promise<{value:string}>;
    /**
     * Get platform
     * @returns Promise<{platform: string}>
     * @since 1.0.0
     */
    getPlatform(): Promise<{platform: string}>;
     /**
     * Open a store
     * @param options: {database?: string, table?: string,
     *                  encrypted?: boolean, mode?: string}
     * @returns Promise<void>
     * @since 0.0.1
     */
    openStore(options: {database?: string, table?: string,
                encrypted?: boolean, mode?: string}): Promise<void>;
    /**
     * Close a store
     * Not implemented for Web platform
     * @param options: {database?: string}
     * @returns Promise<void>
     * @since 1.0.0
     */
    closeStore(options: {database?: string}): Promise<void>;
    /**
     * Check if a store is open
     * Not implemented for Web platform
     * @param options: {database?: string}
     * @returns Promise<boolean>
     * @since 1.0.0
     */
    isStoreOpen(options: {database?: string}): Promise<boolean>;
    /**
     * Check if a store exists
     * Not implemented for Web platform
     * @param options: {database?: string}
     * @returns Promise<boolean>
     * @since 1.0.0
     */
    isStoreExists(options: {database?: string}): Promise<boolean>;
    /**
     * Delete a store
     * Not implemented for Web platform
     * @param options: {database?: string}
     * @returns Promise<void>
     * @since 0.0.1
     */
    deleteStore(options: {database?: string}): Promise<void>;
    /**
     * Set or Add a table to an existing store
     * @param options: capTableStorageOptions
     * @returns Promise<void>
     * @since 0.0.1
    */
    setTable(table: string): Promise<void>;
    /**
     * Retrieve a data value for a given data key
     * @param options: capDataStorageOptions
     * @returns Promise<capValueResult>
     * @since 0.0.1
     */
    getItem(key: string): Promise<string | null>;
    /**
     * Store a data with given key and value
     * @param key: string
     * @param value: string
     * @returns Promise<void>
     * @since 0.0.1
     */
    setItem(key: string, value: string): Promise<void>;
    /**
     * Remove a data with given key
     * @param key: string
     * @returns Promise<void>
     * @since 0.0.1
     */
    removeItem(key: string): Promise<void>;
    /**
     * Clear the Data Store (delete all keys)
     * @returns Promise<void>
     * @since 0.0.1
     */
    clear(): Promise<void>;
    /**
     * Check if a data key exists
     * @param key: string
     * @returns Promise<boolean>
     * @since 0.0.1
     */
    isKey(key: string): Promise<boolean>;
    /**
     * Get the data key list
     * @returns Promise<string[]>
     * @since 0.0.1
     */
    getAllKeys(): Promise<string[]>;
    /**
     * Get the data value list
     * @returns Promise<string[]>
     * @since 0.0.1
     */
    getAllValues(): Promise<string[]>;
    /**
     * Get the data value list for filter keys
     * @param filter: string
     * @returns Promise<string[]>
     * @since 0.0.2
     */
    getFilterValues(filter: string): Promise<string[]>;
    /**
     * Get the data key/value pair list
     * @returns Promise<capKeysValuesResult>
     * @since 0.0.1
     */
    getAllKeysValues(): Promise<any[]>;
    /**
     * Check if a table exists
     * Not implemented for Web platform
     * @param option: {table?: string}
     * @returns Promise<boolean>
     * @since 1.0.0
     */
    isTable(options:{table?: string}): Promise<boolean>;
    /**
     * Get the table list for the current store
     * Not implemented for Web platform
     * @returns Promise<string[]>
     * @since 1.0.0
     */
    getAllTables(): Promise<string[]>;
    /**
     * Delete a table
     * Not implemented for Web platform
     * @param options:{table?: string}
     * @returns Promise<void>
     * @since 1.0.0
     */
    deleteTable(options:{table?: string}): Promise<void>;
  /**
   * Import a database From a JSON
   * @param jsonstring string
   * @returns Promise<number>
   * @since 1.1.0
   */
   importFromJson(jsonstring: string): Promise<number>;
  /**
   * Check the validity of a JSON Object
   * @param jsonstring string
   * @returns Promise<boolean>
   * @since 1.1.0
   */
  isJsonValid(jsonstring: string): Promise<boolean>;
  /**
   * Export the given database to a JSON Object
   * @returns Promise<JsonStore>
   * @since 1.1.0
   */
  exportToJson(): Promise<JsonStore>;

}
export const availableFeatures = {
    useStorageSQLite: isFeatureAvailable('CapacitorDataStorageSqlite', 'useStorageSQLite')
}

export const useStorageSQLite = (): StorageSQLiteHook => {
    const platform = Capacitor.getPlatform();
    const storageSQLite:any = CapacitorDataStorageSqlite;
    const echo = useCallback(async (value: string): Promise<any> => {
        if(value) {
            const r = await storageSQLite.echo(value);
            if(r) {
                return r;
            } else {
                return {value: null};
            }
        } else {
            return {value: null};
        }
    }, []);
    const getPlatform = useCallback(async (): Promise<any> => {
        return {platform: platform};
    }, [platform]);

    const openStore = useCallback(async (options: any) => {
        const database: string = options.database ? options.database : "storage";
        const table: string = options.table ? options.table : "storage_table";
        const encrypted: boolean = options.encrypted ? options.encrypted : false;
        const mode:string = options.mode ? options.mode : "no-encryption";
        try {
            await storageSQLite.openStore({database,table,encrypted,mode});
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }

    }, []);

    const closeStore = useCallback(async (options: any) => {
        const database: string = options.database ? options.database : "storage";
        if(platform === "web") return Promise.reject("Not implemented for Web platform");
        try {
            await storageSQLite.closeStore({database});
            return Promise.resolve();
        } catch (err) {
            console.log(`error: ${err}`)
            return Promise.reject(err);
        }
    }, []);

    const isStoreOpen = useCallback(async (options: any) => {
        const database: string = options.database ? options.database : "storage";
        if(platform === "web") return Promise.reject("Not implemented for Web platform");
        try {
            const r = await storageSQLite.isStoreOpen({database});
            if (r) {
                if( typeof r.result != 'undefined') {
                    return Promise.resolve(r.result) ;
                }
            }
            return Promise.resolve(false) ;        
        } catch (err) {
            return Promise.reject(err);
        }
    }, []);

    const isStoreExists = useCallback(async (options: any) => {
        const database: string = options.database ? options.database : "storage";
        if(platform === "web") return Promise.reject("Not implemented for Web platform");
        try {
            const r = await storageSQLite.isStoreExists({database});
            if (r) {
                if( typeof r.result != 'undefined') {
                    return Promise.resolve(r.result) ;
                }
            }
            return Promise.resolve(false) ;        
        } catch (err) {
            return Promise.reject(err);
        }
    }, []);

    const deleteStore = useCallback(async (options: any) => {
        const database: string = options.database ? options.database
                                                  : "storage";
        if(platform === "web") return Promise.reject("Not implemented for Web platform");
        try {
            await storageSQLite.deleteStore({database});
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }
    }, []);    

    const setTable = useCallback(async (table: string) => {
        table = table.length > 0 ? table : "storage_table";
        try {
            await storageSQLite.setTable({table});
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }
    }, []);

    const getItem = useCallback(async (key: string) => {
        try {
            const v = await storageSQLite.get({ key });
            if (v && v.value) {
                    return Promise.resolve(v.value);
            } else {
                return Promise.reject(`no returned value for key ${key}`);
            }
        } catch (err) {
            return Promise.reject(err);
        }
    }, []);

    const setItem = useCallback(async (key: string, value: string) => {
        try {
            await storageSQLite.set({ key, value: value });
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }
    }, []);
    const removeItem = useCallback(async (key: string) => {
        try {
            await storageSQLite.remove({ key });
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }
    }, []);
    const clear = useCallback(async () => {
        try {
            const r = await storageSQLite.clear();
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }
    }, []);
    const isKey = useCallback(async (key: string) => {
        try {
            const r = await storageSQLite.iskey({ key });

            if(r) {
                if( typeof r.result != 'undefined') {
                    return Promise.resolve(r.result) ;
                }
            }
            return Promise.resolve(false) ;        
        } catch (err) {
            return Promise.reject(err);
        }
    }, []);
    const getAllKeys = useCallback(async () => {
        try {
            const r = await storageSQLite.keys();
            if(r) {
                if(r.keys) {
                    return Promise.resolve(r.keys);
                }
            }
            return Promise.resolve([]);
        } catch (err) {
            return Promise.reject(err);
        }
    }, []);
    const getAllValues = useCallback(async () => {
        try {
            const r = await storageSQLite.values();
            if(r) {
                if(r.values) {
                    return Promise.resolve(r.values);
                }
            }
            return Promise.resolve([]);
        } catch (err) {
            return Promise.reject(err);
        }
    }, []);
    const getFilterValues = useCallback(async (filter: string) => {
        try {
            const r = await storageSQLite.filtervalues({ filter });
            if(r) {
                if(r.values) {
                    return Promise.resolve(r.values);
                }
            }
            return Promise.resolve([]);
        } catch (err) {
            return Promise.reject(err);
        }
    }, []);
    const getAllKeysValues = useCallback(async () => {
        try {
            const r = await storageSQLite.keysvalues();
            if(r) {
                if(r.keysvalues) {
                    return Promise.resolve(r.keysvalues);
                }
            }
            return Promise.resolve([]);
        } catch (err) {
            return Promise.reject(err);
        }
    }, []);

    const isTable = useCallback(async (options: any) => {
        const table: string = options.table ? options.table : "storage_table";
        try {
            const r = await storageSQLite.isTable({table});
            if (r) {
                if( typeof r.result != 'undefined') {
                    return Promise.resolve(r.result) ;
                }
            }
            return Promise.resolve(false) ;        
        } catch (err) {
            return Promise.reject(err);
        }
    }, []);

    const getAllTables = useCallback(async () => {
        try {
            const r = await storageSQLite.tables();
            if(r) {
                if(r.tables) {
                    return Promise.resolve(r.tables);
                }
            }
            return Promise.resolve([]);
        } catch (err) {
            return Promise.reject(err);
        }
    }, []);

    const deleteTable = useCallback(async (options: any) => {
        const table: string = options.table ? options.table : "storage_table";
        if(platform === "web") return Promise.reject("Not implemented for Web platform");
        try {
            await storageSQLite.deleteTable({table});
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }
    }, []);
    const importFromJson = useCallback(async (jsonstring: string) => {
        try {
            const r = await storageSQLite.importFromJson({ jsonstring });
            if(r) {
                if(r.changes) {
                    return Promise.resolve(r.changes);
                }
            }
            return Promise.resolve(-1);
        } catch (err) {
            return Promise.reject(err);
        }
    }, []);
    const isJsonValid = useCallback(async (jsonstring: string) => {
        try {
            const r = await storageSQLite.isJsonValid({jsonstring});
            if (r) {
                if( typeof r.result != 'undefined') {
                    return Promise.resolve(r.result) ;
                }
            }
            return Promise.resolve(false) ;        
        } catch (err) {
            return Promise.reject(err);
        }
    }, []);
    const exportToJson = useCallback(async () => {
        try {
            const r = await storageSQLite.exportToJson();
            if(r) {
                if(r.export) {
                    return Promise.resolve(r.export);
                }
            }
            return Promise.resolve({});
        } catch (err) {
            return Promise.reject(err);
        }
    }, []);

    if (!availableFeatures.useStorageSQLite) {
        return {
            echo: featureNotAvailableError,
            getPlatform: featureNotAvailableError,
            openStore: featureNotAvailableError,
            closeStore: featureNotAvailableError,
            isStoreOpen: featureNotAvailableError,
            isStoreExists: featureNotAvailableError,
            deleteStore: featureNotAvailableError,
            setTable: featureNotAvailableError,
            setItem: featureNotAvailableError,
            getItem: featureNotAvailableError,
            isKey: featureNotAvailableError,
            getAllKeys: featureNotAvailableError,
            getAllValues: featureNotAvailableError,
            getFilterValues: featureNotAvailableError,
            getAllKeysValues: featureNotAvailableError,
            removeItem: featureNotAvailableError,
            clear: featureNotAvailableError,
            isTable: featureNotAvailableError,
            getAllTables: featureNotAvailableError,
            deleteTable: featureNotAvailableError,
            importFromJson: featureNotAvailableError,
            exportToJson: featureNotAvailableError,
            isJsonValid: featureNotAvailableError,
            ...notAvailable
        };
    } else {

        return { echo, getPlatform, openStore, closeStore, isStoreOpen, isStoreExists,
            deleteStore, setTable, getItem, setItem, removeItem, clear,
            isKey, getAllKeys, getAllValues, getFilterValues,
            getAllKeysValues, isTable, getAllTables, deleteTable,
            importFromJson, exportToJson, isJsonValid, isAvailable: true
        };
    }
}
