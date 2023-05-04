var hasSurged = actor.getFlag("wild-magic-surge-5e", "hassurged");
console.log(hasSurged);
if (hasSurged) {
  new Sequence("WMSTRUE")
    .effect()
    .file("modules/JB2A_DnD5e/Library/Generic/Marker/EnergyStrands_01_Regular_Blue_600x600.webm")
    .duration(10000)
    .fadeIn(500)
    .fadeOut(1000)
    .atLocation(token.id)
    .sound("EXTERNAL%20FILES/sons/magias/sussuros.ogg")  
    .play();
} else {
  new Sequence("WMSTRUE")
    .effect()
    .file("modules/JB2A_DnD5e/Library/Generic/Marker/EnergyStrands_01_Regular_Blue_600x600.webm")
    .duration(10000)
    .fadeIn(500)
    .fadeOut(1000)
    .atLocation(token.id)
    .sound("EXTERNAL%20FILES/sons/magias/sussuros.ogg") 
    .play();
}
