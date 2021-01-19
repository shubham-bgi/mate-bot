function checkFWA(clanDescription) {
    let checkPhrases = [
        /fwa/i, 
        /farming war alliance/i, 
        /farm war alliance/i, 
        /farmwaralliance/i, 
        /f.w.a/i,
        /🇴‌🇫‌🇫‌🇮‌🇨‌🇮‌🇦‌🇱‌🇫‌🇼‌🇦/i, 
        /ᴏғғɪᴄɪᴀʟ ғᴡᴀ ᴄʟᴀɴ/i, 
        /OFFICIAL GFL/i,
        /GFL/i, 
        /farm wars/i, 
        /OFICIAL.F.W.A/i, 
        /Farmwar/i, 
        /ғᴀʀᴍ ᴡᴀʀ/i, 
        /F̶αrm W̶αr/i, 
        /ғᴡᴀ/i, 
        /* /0.f.f.I.C.I.A.L/i, 
        /O.f.f.I.C.I.A.L/i,  */
        /🇴‌🇫‌🇫‌🇮‌🇨‌🇮‌🇦‌🇱‌🇫‌🇼‌🇦/i,
        /Fαrm Wαr Allıαnce/i,
        /farmers/i,
        /farming/i,
    ]
    for(i=0 ; i<checkPhrases.length ; i++) {
        if (clanDescription.search(checkPhrases[i]) != -1) {
            return true;
        }
    }
    return false;
}

module.exports = {
    checkFWA: checkFWA
}