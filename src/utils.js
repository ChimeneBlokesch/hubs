export function listToDictByName(list) {
    var dict = {};

    for (var i = 0; i < list.length; i++) {
        dict[list[i].name] = list[i];
    }

    return dict;
}
