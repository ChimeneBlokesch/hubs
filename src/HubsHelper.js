// Function as shown in
// https://www.youtube.com/watch?v=sq8d2-M-O_Q&t=1742s at 4:15
function HubsElementChange(el, newScale = null, newPos = null, newRot = null) {
    NAF.utils.getNetworkedEntity(el).then(networkedEl => {
        const mine = NAF.utils.isMine(networkedEl);
        var owned = NAF.utils.takeOwnership(networkedEl);

        if (newScale) networkedEl.setAttribute("scale", newScale.toString());
        if (newPos) networkedEl.setAttribute("position", newPos.toString());
        if (newRot) networkedEl.setAttribute("rotation", newRot.toString());
    });
}
