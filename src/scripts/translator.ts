interface ISomeObject {
    [key: string]: ISomeObject | string | undefined;
}
class Translation {
    public name?: string;
    public values?: Translation[];
    public value?: string;
    public translated?: string;
    // build the Translation Object
    constructor (file: ISomeObject | undefined | string, name?: string) {
        // Wenn es ein Object ist hat es noch files unter sich (kinder)
        if (typeof file === 'object') {
            this.values = [];
            // kinder erstellen
            for (const key of Object.keys(file)) {
                const entry: ISomeObject | undefined | string = file[key];
                // daten und den Namen mitgeben
                this.values.push(new Translation(entry, key));
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
    public getTranslatedFile (): ISomeObject | string | undefined {
        const object: ISomeObject = {};
        // wenn noch Kinder vorhanden sind loop wird über die einträge geloopt
        if (this.values) {
            let entry: Translation;
            for ( entry of this.values) {
                // methode auf jedem kind aufrufen und das ergebnis im Objekt speichern
                if (entry.name) {
                        object[entry.name] = entry.getTranslatedFile();
                }
            }
        // wenn keine Kinder vorhanden sind wird der Übersetze text an den Parent zurückgegeben
        } else {
            if (this.translated) {
                return this.translated;
            } else {
                return void 0;
            }
        }
        // am ende wird das Fertige Objekt zurückgegeben
        return object;
    }
    // Methode um eine Angefangene Übersetzungsdatei zu laden
    public generateTranslations (file: Translation) {
        // prüfen ob kinder vorhanden sind
        if (this.values && file.values) {
            // drüber loopen und jewils abgleichen ob etwas übereinstimmt
            for (const entry of this.values) {
                for (const entryT of file.values) {
                    if (entryT.name === entry.name) {
                        // falls ja, dort wieder diese methode aufrufen und jewils das kind,
                        // der übersetzten datei mitgeben
                        entry.generateTranslations(entryT);
                    }
                }
            }
        } else {
            // wenn es keine Kinder mehr unten drunter hat, abgleichen ob die namen gleich sind
            if ( this.name === file.name ) {
                // values vorfüllen
                this.translated = file.value;
            }
        }
    }
}

export function getParsedArray (file: ISomeObject ) {
    const translation = new Translation(file);
    return translation;
}

export function getTranslatedFile (file: Translation) {
    const translatedFile = file.getTranslatedFile();
    return translatedFile;
}

export function generateTranslations (file: Translation, translatedFile: ISomeObject) {

    file.generateTranslations(new Translation(translatedFile));
}
