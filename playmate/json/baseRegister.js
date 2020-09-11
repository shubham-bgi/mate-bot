const cwl = require('./cwl')
module.exports = {
    "wrongAnswerCount" : 1,
    "quiz" : [
        {//0
            "info": " Found the best clan for you!",
            "question": "Do you want me to ping the recruiter so they may contact you?\nType either ``yes`` or ``no``.",
            "answer": ["yes", "no"],
            "onWrongReply": "Not a valid option. Type either ``yes`` or ``no``."
        },
        {//1
            "info": "Alright finding another clan...",
            "question": "Do you want me to ping the recruiter so they may contact you?\nType either ``yes`` or ``no``.",
            "answer": ["yes", "no"],
            "onWrongReply": "Not a valid option. Type either ``yes`` or ``no``."
        },
        {   
            "info": "Type numbers with comma between them, Suppose you care about clan wars and activity. Type ``2,3``.",
            "question": "What do you care about the most in a clan?\nType the corresponding number.Any three only!\n1.Clan War League\n2.Activity\n3.Clan Wars\n4.Clan level\n5.Home base trophies\n6.Builder base trophies\n7.Non rushed clan players.\n8.Cancel",
            "answer": ["1", "2", "3", "4", "5", "6", "7", "8"],
            "onWrongReply": "Wrong answer bruh. Only 3 numbers accepted."
        }
        /* {//1
            "question": "Do you want to fill out your preferences for a clan?\nType either ``yes`` or ``no``.",
            "answer": ["yes", "no"],
            "onWrongReply": "Not a valid option. Type either ``yes`` or ``no`"
        },
        {//2
            "question": "Are you looking for farm war alliance clans?\n Type either ``yes`` or ``no``.",
            "answer": ["yes","no"],
            "onWrongReply": "Not a valid option. Type either ``fwa``, ``war`` or ``casual``"
        },
        {//3
            "question": "What is the minimum cwl are you looking for?\n Type the league name like ``gold 2`` or ``champion 3``.",
            "answer": cwl,
            "onWrongReply": "Wrong awnser bruh, Type league name first then league number, if you want to be in Gold League II, Type ``gold 2``."
        },
        {//4
            "question": "What is the minimum clan level are you looking for?\n Type a number between 1 to 10.",
            "answer": ["1","10"],
            "onWrongReply": "Wrong awnser bruh, Type a number between ``1`` and ``10``."
        },
        {//
            "question": "cool! Now, Any minimum number of players there should be in clan?\n Type a number between 0 to 50.",
            "answer": ["0","50"],
            "onWrongReply": "Wrong awnser bruh, Type a number between ``0`` and ``50``."
        },
        {//
            "question": "what is the minimum clan trophies you looking for?\nPlease type any number between ``0`` to ``50000``",
            "answer": ["0","50000"],
            "onWrongReply": "Wrong awnser bruh, Type a number between ``0`` to ``50000``."
        },
        {//
            "question": "What is the minimum clan versus trophies you are looking for?\nPlease type any number between ``0`` to ``50000``",
            "answer": ["0","50000"],
            "onWrongReply": "Wrong awnser bruh, Type a number between ``0`` to ``50000``."
        },
        {//5
            "question": "Any prefernce on the location of the clan? Type the country calling code,you can check it here https://countrycode.org, type ``idc`` if you are fine with any country, or type ``int`` to look for clans with international players.",
            "answer": ["idc", "int"],
            "onWrongReply": "Not a valid number or option, please recheck."
        },
        {//6
            "info": "On scale of 0-10.",
            "question": "How active you want clan players to be? Please type a value between 0 to 10. Your current activeness: ",
            "answer": [0,10],
            "onWrongReply": "Not a valid value. Type a number between 0 to 10."
        },
        {//7
            "question": "How many minimum siege donators there should be in the clan?\n Please type a number between 0 - 25.",
            "answer": [0,25],
            "onWrongReply": "Not a valid number. Please type a number between 0-10."
        },
        {//8
            "question": "Do care about wars? What is the minimum war rate (in percentage) are you looking for?\n Please type a number between 0-100.",
            "answer": [0,100],
            "onWrongReply": "Sorry, please type a number between 0 - 100."
        } */
    ],
    "autoCancel": "Due to back to back invalid awnsers, i\'ma stop this.",
    "endText": "Thank you for answering all the questions, I will start searching a clan for you."
}