export function findObjectById<Type> (objectArray: Array<Type>, objectId: string) {
    return objectArray.filter((object) => {
        // @ts-ignore
        return object.id == objectId;
    })[0];
}
