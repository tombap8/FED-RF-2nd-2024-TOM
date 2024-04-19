// 캐릭터 객체 데이터 

const cdata = {
    "anakin" : {
        name : "Anakin Skywalker",
        imglink : "anakin.jpg",
        desc : "Discovered as a slave on Tatooine by Qui-Gon Jinn and Obi-Wan Kenobi, Anakin Skywalker had the potential to become one of the most powerful Jedi ever. Some even believed he was the prophesied Chosen One who would bring balance to the Force. Always pushing the limits of his Jedi training, seeking to excel and live up to his reputation, Skywalker's passion often brought him into conflict with his mentor, Jedi Master Obi-Wan Kenobi. A hero of the Clone Wars, Anakin was caring and compassionate, but suffered from a deep fear of loss that would prove to be his downfall.",
    },
    "padme" : {
        name : "Padmé Amidala",
        imglink : "padme.jpeg",
        desc : "Padmé Amidala was a courageous, hopeful leader, serving as Queen and then Senator of Naboo -- and was also handy with a blaster. Despite her ideals and all she did for the cause of peace, her secret, forbidden marriage to Jedi Anakin Skywalker would prove to have dire consequences for the galaxy.",
    },
    "obiwan" : {
        name : "Obi-Wan Kenobi",
        imglink : "obiwan.jpeg",
        desc : "A legendary Jedi Master, Obi-Wan Kenobi was a noble man and gifted in the ways of the Force. He trained Anakin Skywalker, served as a general in the Republic Army during the Clone Wars, and guided Luke Skywalker as a mentor.",
    },
    "yoda" : {
        name : "Yoda",
        imglink : "yoda.jpeg",
        desc : "Yoda was a legendary Jedi Master and stronger than most in his connection with the Force. Small in size but wise and powerful, he trained Jedi for over 800 years, playing integral roles in the Clone Wars, the instruction of Luke Skywalker, and unlocking the path to immortality.",
    },
    "c3po" : {
        name : "C-3PO (See-Threepio)",
        imglink : "c3po.jpeg",
        desc : "C-3PO longs for more peaceful times, but his continued service to the Resistance — and his knowledge of more than seven million forms of communication — keeps the worry-prone droid in the frontlines of galactic conflict. Programmed for etiquette and protocol, Threepio was built by a young Anakin Skywalker, and has been a constant companion to astromech R2-D2. Over the years, he was involved in some of the galaxy’s most defining moments and thrilling battles. Since the Empire’s defeat, C-3PO has served Leia Organa, head of a Resistance spy ring aimed at undermining the First Order.",
    },

    "r2d2" : {
        name : "R2-D2",
        imglink : "r2d2.jpeg",
        desc : "A reliable and versatile astromech droid, R2-D2 has served Padmé Amidala, Anakin Skywalker, and Luke Skywalker in turn, showing great bravery in rescuing his masters and their friends from many perils. A skilled starship mechanic and fighter pilot's assistant, he has an unlikely but enduring friendship with the fussy protocol droid C-3PO.",
    },
    "windu" : {
        name : "Mace Windu",
        imglink : "windu.jpeg",
        desc : "A grim Jedi Master with an amethyst-bladed lightsaber, Mace Windu was the champion of the Jedi Order, with little tolerance for the failings of the Senate, the arguments of politicians, or the opinions of rebellious Jedi. As the Clone Wars intensified, Mace sensed the dark side of the Force at work, and knew the Jedi's enemies were plotting to destroy the Order and end its stewardship of the galaxy.",
    },
    "palpatine" : {
        name : "Emperor Palpatine / Darth Sidious",
        imglink : "palpatine.jpeg",
        desc : "The dark side of the Force is a pathway to many abilities some consider to be unnatural, and Sheev Palpatine is the most infamous follower of its doctrines. Scheming, powerful, and evil to the core, Darth Sidious restored the Sith and destroyed the Jedi Order. Living a double life, he was also Palpatine, a Naboo Senator and phantom menace. He manipulated the political system of the Galactic Republic until he was named Supreme Chancellor -- and eventually Emperor – and ruled the galaxy through fear and tyranny. The galaxy rejoiced when he died at the Battle of Endor, but Sidious had cheated death and patiently plotted a return to power.",
    },
    "jango" : {
        name : "Jango Fett",
        imglink : "jangofett.jpeg",
        desc : "In the final years of the Republic, Jango Fett was regarded as the best bounty hunter in the galaxy. A proficient marksman and unarmed combatant, Fett was covered in a sleek armored suit that concealed his scarred face. His combat gear featured an arsenal of weaponry, including retractable wrist blades, a snare, dual blaster pistols and other more exotic tools of the trade. In combat, Jango used his harnessed jetpack to gain the advantage of speed and height over his enemies. The backpack also carried a nasty surprise -- an explosive rocket could be launched from it. For interstellar travel, Jango traveled aboard his well-worn starship, Slave I.",
    },
    "dooku" : {
        name : "Count Dooku",
        imglink : "dooku.jpeg",
        desc : "Count Dooku was a menacing Sith Lord and central figure in the Clone Wars. Once a Jedi -- trained by Yoda -- he became disillusioned with the Jedi Order and thirsted for greater power. Dooku voluntarily left the light side behind and became Darth Sidious’ dark side disciple, taking the secret name Darth Tyranus and leading the Separatist army. Dooku advanced Sidious’s secret plot to take over the galaxy, but forgot that betrayal is the nature of the Sith.",
    },
}

const vdata = {
    "opening" : {
        titname : "Star Wars: Episode II Attack of the Clones - Opening Crawl",
        imglink : "1.webp",
        videotime : "1:27",
        videolink : "4fb999cac4e68b32908cee25",
    },
    "collection" : {
        titname : "Attack of the Clones - Star Wars: The Digital Movie Collection",
        imglink : "2.webp",
        videotime : "1:09",
        videolink : "512d99ffcca4f4c3cb2e7a69",
    },
    "teaser" : {
        titname : "Episode II Teaser: Breathing",
        imglink : "3.webp",
        videotime : "1:07",
        videolink : "4e35415839c0acc9fce2bc2f",
    },
    "concept" : {
        titname : "Episode II: Yoda Proof-of-Concept",
        imglink : "4.jpeg",
        videotime : "2:59",
        videolink : "4e37fab62c0280dd33f20402",
    },
    "rain" : {
        titname : "Rumble in the Rain",
        imglink : "5.webp",
        videotime : "1:25",
        videolink : "4e3625507645e20c341c602d",
    },
    "finale" : {
        titname : "Execution Arena Finale",
        imglink : "6.webp",
        videotime : "1:57",
        videolink : "4e3632c283ba8a6b5b906326",
    },
}

const gdata = {
    story : [
        "Senator Amidala returns to Coruscant for a most important vote that will determine if the Republic will create an army to oppose the rise of the Separatists. Amidala wants a peaceful resolution to the crisis, and fears an army will only provoke a full galactic war.",
        "Handmaiden Corde, posing as Senator Padmé Amidala, is killed when the Naboo cruiser is blown apart by an explosion. A mysterious assassin is targeting Padmé. She believes it to be Count Dooku.",
        "The Jedi Council warns Chancellor Palpatine that one wrong move could start a war between the Republic and the Separatists. Mace Windu reminds the Chancellor that the Jedi are not soldiers, but peacekeepers.",
        "Jedi Master Obi-Wan Kenobi and Padawan Anakin Skywalker are sent by the Jedi Council to protect Padmé Amidala and investigate who is trying to kill her. For Anakin, it is the first time seeing Padmé in ten years.",
        "Bounty hunter Jango Fett gives assassin Zam Wesell a tube filled with deadly kouhuns to use to kill Senator Padmé Amidala.",
        "While guarding Padmé, Obi-Wan and Anakin sense something wrong, burst into her bedroom and kill the poisonous kouhuns slithering on her bed.",
        "Obi-Wan spots an assassin droid and crashes through Padmé's window to capture it. Anakin chases down Obi-Wan in a `borrowed` airspeeder. ",
        "Obi-Wan and Anakin track Zam Wesell to a seedy nightclub. With a blaster aimed at his back, Obi-Wan severs Zam's arm with his lightsaber. When the Jedi try to question the injured Zam in the alley, she's shot with a mysterious dart. An armored bounty hunter with a rocket pack flies away from the scene.",
        "With Padmé's life threatened, the Jedi Council and the Supreme Chancellor both decide she needs protection. Anakin Skywalker is assigned to escort her back to a secure retreat on Naboo. They travel undercover, as refugee peasants, on a passenger liner.",
        "Meanwhile, Obi-Wan visits Dexter Jettster, owner of Dex's Diner, and a streetsmart source of rumor and information. With Dex's help, Obi-Wan identifies the weapon that killed that Zam: a Kamino saberdart.",
        "To locate the mysterious world of Kamino, Obi-Wan consults the Jedi Temple's Archives Library only to discover that Kamino doesn't exist in the records. ",
        "Obi-Wan interrupts Yoda as he teaches a class of students to ask the Master's advice regarding his search for the missing planet of Kamino. One of the students suggests that someone must have erased it from the archive memory. Yoda advises Obi-Wan go to the center of the gravity's pull -- where Kamino should be but isn't -- to find the planet.",
        "Obi-Wan voyages to Kamino and visits Tipoca City where he's greeted by Taun We, a Kaminoan. Prime Minister Lama Su informs Obi-Wan of the progress of the clone army for the Republic ordered by Master Sifo-Dyas. Obi-Wan plays along, pretending to know what the Kaminoans are talking about. ",
        "Each clone is a perfect biological replica of bounty hunter Jango Fett, modified to grow at twice the rate of normal human aging. The clone army, begun 10 years ago, is nearing readiness for deployment. Jango lives in the Kamino facility with an un-accelerated clone that he treats as his son, Boba. Obi-Wan visits Jango to ask him of his recent whereabouts on Coruscant.",
        "Meanwhile on Naboo, Anakin Skywalker professes his love to Padmé Amidala during their stay at the romantic lake retreat. Padmé reminds him their love could never work since the Jedi aren't allowed to marry, and he could be expelled from the Order.",
        "Anakin has a terrible nightmare of his mother Shmi suffering and in pain. He tells Padmé he must go help his mother and she agrees to go with him to Tatooine.",
        "Jango and Boba, wary of the Jedi, flee from Obi-Wan to their ship, Slave I. Obi-Wan tries to stop Jango, leading to a fight on the landing platform. Before the Slave I escapes, Obi-Wan places a tracking device on the ship's hull.",
        "On Tatooine, Anakin and Padmé find Watto, his former owner, and discover that he sold Shmi to a moisture farmer named Cliegg Lars who then freed her and married her. Anakin and Padmé visit the Lars homestead where they are greeted by Anakin's protocol droid creation, C-3PO. Cliegg, along with his son Owen and Owen's girlfriend Beru, tell Anakin that Shmi was kidnapped by Tusken Raiders.",
        "Riding Owen's swoop bike, Anakin goes in search for his mother only to find her being held captive in a Tusken Raider camp. But it was too late. She died in his arms from her injuries inflicted by the Tuskens. Overwhelmed by grief and rage, Anakin sought revenge on those who tortured his mother, and he massacred the entire camp.",
        "Anakin returns to the Lars homestead with his mother's body for burial. Anakin reveals to Padmé that he killed the entire camp of Tusken Raiders and swears that one day he will be the most powerful Jedi ever.",
        "Obi-Wan chases Jango Fett's Slave I into an asteroid field above the planet Geonosis. Jango fires seismic charges at Obi-Wan's ship. After Jango launches a guided aerial torpedo at his starfighter, Obi-Wan tricks him into thinking he's hit, and then follows Jango unnoticed to Geonosis.",
        "While on Geonosis, Obi-Wan stumbles upon a secret meeting with Viceroy of the Trade Federation Nute Gunray, Count Dooku, several Senators, as well as leaders from the Commerce Guilds, the Corporate Alliance and the InterGalactic Banking Clan who agreed to wage war against the Republic.",
        "Obi-Wan sends a holographic message to the Jedi Temple on Coruscant to inform them of the growing Separatist droid army, Viceroy Gunray's involvement in the assassination attempts on Padmé, and the commerce guilds pledge of loyalty to Count Dooku. ",
        "Obi-Wan Kenobi is captured by the Geonosians, and held prisoner by Count Dooku who attempts to recruit Obi-Wan to the Separatist cause by informing him that the Senate is being manipulated by a Sith Lord called Darth Sidious.",
        "Anakin and Padmé, along with R2-D2 and C-3PO, travel to Geonosis to rescue Obi-Wan Kenobi against the Jedi Council's orders. While there, they stumble upon a droid factory where they are attacked by winged Geonosians."
    ],
    behind : [
        "Full-size prop of Obi-Wan's Jedi starship.",
        "Stunt coordinator Nick Gillard (left) and Ewan McGregor (right) practice lightsaber-duel choreography.",
        "Anthony Daniels returns in-costume as C-3PO.",
        "Hayden Christensen on-set as Anakin Skywalker. ",
        "Natalie Portman gets last-minute hair and makeup for a Naboo scene in Como, Italy.",
        "Aides inside the Chancellor's office between takes.",
        "ILM's John Knoll and Jason Snell prepare for a shot on a Geonosis miniature.",
        "Shooting the 'Rumble in the Rain' between Jango Fett and Obi-Wan Kenobi.",
        "Jedi charge the Separatists' droid army to start the climactic Battle of Geonosis, with a background to be added digitally.",
        "Hayden Christensen and Natalie Portman in Como, Italy.",
        "Bonnie Piesse (Beru Lars), Joel Edgerton (Owen Lars), and Jack Thompson (Cliegg Lars) relax during filming in Tunisia.",
        "R2-D2 prop at the Lars homestead in Tunisia.",
        "Filming an astromech droid in Tunisia."
    ],
}