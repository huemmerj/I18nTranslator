class Translation {
    public name?: string;
    public values?: Translation[];
    public value?: string;
    public translated?: string;
    // build the Translation Object
    constructor (file: object, name?: string) {
        // Wenn es ein Object ist hat es noch files unter sich (kinder)
        if (typeof file === 'object') {
            this.values = [];
            // kinder erstellen
            for (const index of Object.keys(file)) {
                const entry = file[index];
                // daten und den Namen mitgeben
                this.values.push(new Translation(entry, index));
            }
        // wenn es keine kinder hat wird der Wert der Wert auf den Value gesetzt
        } else {
            this.value = file;
            this.translated = '';
        }
        // wenn der Name vorhanden ist wird er gesetzt
        if (name) {
            this.name = name;
        }
    }
    // gibt das Fertige File zurück
    public getTranslatedFile (): object | string {
        const object = {};
        // wenn noch Kinder vorhanden sind loop wird über die einträge geloopt
        if (this.values) {
            for (const entry  of this.values) {
                // methode auf jedem kind aufrufen und das ergebnis im Objekt speichern
                object[entry.name] = entry.getTranslatedFile();
            }
        // wenn keine Kinder vorhanden sind wird der Übersetze text an den Parent zurückgegeben
        } else {
            if (this.translated) {
                return this.translated;
            } else {
                return '';
            }
        }
        // am ende wird das Fertige Objekt zurückgegeben
        return object;
    }
    public generateTranslations (file: Translation) {
        if (this.values && file.values) {
            for (const entry of this.values) {
                for (const entryT of file.values) {
                    if (entryT.name === entry.name) {
                        entry.generateTranslations(entryT);
                    }
                }
            }
        } else {
            if ( this.name === file.name ) {
                this.translated = file.value;
            }
        }
    }
}

export function getParsedArray (file: object) {
    const translation = new Translation(file);
    return translation;
}

export function getTranslatedFile (file: Translation) {
    const translatedFile = file.getTranslatedFile();
    return translatedFile;
}

export function generateTranslations (file: Translation, translatedFile: object) {

    file.generateTranslations(new Translation(translatedFile));
}
