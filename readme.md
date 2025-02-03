A térképész
Nekeresdország szomszédjában egy hatalmas ország, a Burgonyák Birodalom helyezkedik el, amelynek sok része mind a mai napig ismeretlen és lakatlan. Ennek uralkodója, Pityóka császárnő elrendelte ezeknek a területeknek a feltérképezését és benépesítését. Első lépésként a táj felderítésére Téged mint birodalmi térképészt bízott meg. A császárnő küldetésekkel határozza meg, hogy milyen tájakat szeretne látni a birodalmában. Segíts neki, minél jobban teljesíteni a kívánságait, így a Te hírneved is ennek megfelelően növekedhet!

assets/readme/theme.png

A játék leírása
Rövid áttekintés
Ebben az egyszemélyes játékban egy 11x11-es négyzetrácsos térképre kell lehelyezni különböző alakzatú, különböző tereptípusú térképelemeket. Minden elemhez tartozik egy időérték (1 vagy 2), a játék 28 időegységből áll. A játék végén (vagy közben) a négyzetrács aktuális állapota alapján kell pár ellenőrzést (küldetést) elvégezni, és ez alapján alakul ki a végső pontszám.

A térkép kiindulási állapota
A térkép egy 11x11-es négyzetrács, kezdetben üres cellákkal feltöltve. A térképen 5 fix cellában hegymezők találhatóak. A hegyeink a térkép alábbi mezőiben találhatóak:

(sor, oszlop) => (2,2), (4,9), (6,4), (9,10), (10,6)
ures_terkep_hegyekkel.png

Térképelemek lehelyezése
A letehető térképelemek tereptípusai a következők lehetnek: erdő, falu, farm és víz. Az összes lehetséges elemet megadtuk lejjebb egy JavaScript tömbben, ezek közül néhány így néz ki:

lehetseges_alakzatok.png

A lehetséges elemeket véletlenszerűen megkeverjük, majd sorban egymás után egyesével kell őket lehelyezni a térképre. Minden térképelemet tudunk forgatni és tükrözni, és a térképelem nem fedhet le egy már teli mezőt (a hegy is ennek számít), illetve nem lóghat le egy része sem a térképről.

 jo.png

rossz.png

A játék időtartama
A játék 28 időegységig tart. Minden térképelemhez tartozik egy időegység, ami meghatározza, hogy mennyi ideig tart őket felfedezni. Addig tudunk új térképelemeket húzni, amíg el nem érjük a 28 időegységet. Ha az összesített időérték eléri, vagy meghaladja a 28 időegységet, a játék véget ér. Például, ha 1 időegységünk maradt hátra, és egy két időegységgel rendelkező térképelemet kapunk, a térképelemet még lehelyezhetjük, és utána a játék véget ér.

Pontszámítás
Minden játék elején ki kell választani 4 véletlenszerű küldetéskártyát (A,B,C,D), amik alapján pontot lehet kapni. Ilyen küldetéskártya lehet például ez:

'A hegymezőiddel szomszédos vízmezőidért három-három pontot kapsz.'

küldetés.png

Ha a hegyeket 4 oldalról körbevesszük, körbevett hegyenként 1-1 pontot kapunk.

hegybekerites.png

A játék végén meg kell számolni mindegyik küldetés alapján kapott pontokat, és ezek összesített eredménye lesz a végleges pontszám. A négy küldetésnél egyenként is fel kell tüntetni, melyik küldetésre hány pontot kaptunk!

Évszakok
A 28 időegység egy évet jelképez. Ez felbontható 4 évszakra, mindegyik évszak 7 időgységig tart. Ha a térképelemek húzása közben az összesített időérték eléri, vagy meghaladja a 7 többszörösét, az évszak véget ér.

Minden évszak végén 2 küldetéskártyáért tudunk pontszámot kapni. A tavasz végén az A-B küldetésért, a nyár végén a B-C küldetésért, az ősz végén a C-D küldetésért, a tél végén pedig a D-A küldetésért tudunk pontokat szerezni. A négy küldetésnél egyenként fel kell tüntetni évszakonként, melyik küldetésre hány pontot kaptunk!

A játék végén a négy évszak alatt szerzett pontszámaink összeadódnak, és ezek fogják adni a végleges pontszámunkat.

fokerpernyo.png

Küldetések
Itt találod a játékban kiértékelendő küldetéseket és a hozzájuk tartozó ábrákat.

Alap küldetések
alap_kuldetesek.png

Az erdő széle: A térképed szélével szomszédos erdőmezőidért egy-egy pontot kapsz.
Álmos-völgy: Minden olyan sorért, amelyben három erdőmező van, négy-négy pontot kapsz.
Krumpliöntözés: A farmmezőiddel szomszédos vízmezőidért két-két pontot kapsz.
Határvidék: Minden teli sorért vagy oszlopért 6-6 pontot kapsz.
Extra küldetések (plusz pontért)
extra_kuldetesek.png

Fasor: A leghosszabb, függőlegesen megszakítás nélkül egybefüggő erdőmezők mindegyikéért kettő-kettő pontot kapsz. Két azonos hosszúságú esetén csak az egyikért.
Gazdag város: A legalább három különböző tereptípussal szomszédos falumezőidért három-három pontot kapsz.
Öntözőcsatorna: Minden olyan oszlopodért, amelyben a farm illetve a vízmezők száma megegyezik, négy-négy pontot kapsz. Mindkét tereptípusból legalább egy-egy mezőnek lennie kell az oszlopban ahhoz, hogy pontot kaphass érte.
Mágusok völgye: A hegymezőiddel szomszédos vízmezőidért három-három pontot kapsz.
Üres telek: A falumezőiddel szomszédos üres mezőkért 2-2 pontot kapsz.
Sorház: A leghosszabb, vízszintesen megszakítás nélkül egybefüggő falumezők mindegyikéért kettő-kettő pontot kapsz.
Páratlan silók: Minden páratlan sorszámú teli oszlopodért 10-10 pontot kapsz.
Gazdag vidék: Minden legalább öt különböző tereptípust tartalmazó sorért négy-négy pontot kapsz.
Segítségképpen megadjuk a küldetésekhez tartozó objektumot:

const missions = 
{
  "basic": [
    {
      "title": "Az erdő széle",
      "description": "A térképed szélével szomszédos erdőmezőidért egy-egy pontot kapsz."
    },
    {
      "title": "Álmos-völgy",
      "description": "Minden olyan sorért, amelyben három erdőmező van, négy-négy pontot kapsz."
    },
    {
      "title": "Krumpliöntözés",
      "description": "A farmmezőiddel szomszédos vízmezőidért két-két pontot kapsz."
    },
    {
      "title": "Határvidék",
      "description": "Minden teli sorért vagy oszlopért 6-6 pontot kapsz."
    }
  ],
  "extra": [
    {
      "title": "Fasor",
      "description": "A leghosszabb, függőlegesen megszakítás nélkül egybefüggő erdőmezők mindegyikéért kettő-kettő pontot kapsz. Két azonos hosszúságú esetén csak az egyikért."
    },
    {
      "title": "Gazdag város",
      "description": "A legalább három különböző tereptípussal szomszédos falurégióidért három-három pontot kapsz."
    },
    {
      "title": "Öntözőcsatorna",
      "description": "Minden olyan oszlopodért, amelyben a farm illetve a vízmezők száma megegyezik, négy-négy pontot kapsz. Mindkét tereptípusból legalább egy-egy mezőnek lennie kell az oszlopban ahhoz, hogy pontot kaphass érte."
    },
    {
      "title": "Mágusok völgye",
      "description": "A hegymezőiddel szomszédos vízmezőidért három-három pontot kapsz."
    },
    {
      "title": "Üres telek",
      "description": "A városmezőiddel szomszédos üres mezőkért 2-2 pontot kapsz."
    },
    {
      "title": "Sorház",
      "description": "A leghosszabb, vízszintesen megszakítás nélkül egybefüggő falumezők mindegyikéért kettő-kettő pontot kapsz."
    },
    {
      "title": "Páratlan silók",
      "description": "Minden páratlan sorszámú teli oszlopodért 10-10 pontot kapsz."
    },
    {
      "title": "Gazdag vidék",
      "description": "Minden legalább öt különböző tereptípust tartalmazó sorért négy-négy pontot kapsz."
    }
  ],
}
Lehetséges elemtípusok
A lehetséges elemtípusokat ebben a tömbben találod meg, ezt előkészítettük neked. Ezt kell a játék elején megkeverned, majd egyesével lehelyezned. A lehelyezés kivitelezése rád van bízva. Lehet az is, hogy az egér mozgatása közben mindig kirajzolod halványan a lehelyezendő elemet, de egy másik megoldás lehet az, hogy csak kattintasz egy cellára, és a bal felső cellától kezdve fogja beilleszteni az alakzatot a megadott helyre. Az objektumoknak van ˛rotation és mirrored adattagja is, hogy ezeket is tudd tárolni a kisorsolt alakzatokban.

const elements = [
    {
        time: 2,
        type: 'water',
        shape: [[1,1,1],
                [0,0,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'town',
        shape: [[1,1,1],
                [0,0,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false        
    },
    {
        time: 1,
        type: 'forest',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'farm',
        shape: [[1,1,1],
                [0,0,1],
                [0,0,0]],
            rotation: 0,
            mirrored: false  
        },
    {
        time: 2,
        type: 'forest',
        shape: [[1,1,1],
                [0,0,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'town',
        shape: [[1,1,1],
                [0,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'farm',
        shape: [[1,1,1],
                [0,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'town',
        shape: [[1,1,0],
                [1,0,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'town',
        shape: [[1,1,1],
                [1,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'farm',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'farm',
        shape: [[0,1,0],
                [1,1,1],
                [0,1,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,1,1],
                [1,0,0],
                [1,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,0,0],
                [1,1,1],
                [1,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,1]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,1,0],
                [1,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
]
Játéktér
fokerpernyo.png

A játéktéren az alábbi dolgok jelennek meg:

11x11-es mátrix a térképpel, amin a hegyek és a letett alakzatok látszanak
A véletlenszerűen kiválasztott küldetések nevei és leírása
A játékból hátralévő idő
Melyik évszakban vagyunk éppen, és jelzi a játék, hogy ezekhez melyik küldetés tartozik
Az évszakok alatt gyűjtött pontszámaink
A pontszámaink összesen, és melyik küldetésre hány pontot kaptunk.
A lehelyezendő elem és a hozzátartozó időtartam
Forgatás és tükrözés gombok
Segítség a feladat megoldásához
A beadandó megoldásánál ugyanazon lépések követését ajánljuk, mint amik az előadáson elhangzottak.

Felhasználói felület megtervezése
Készítsd el az oldalt statikus elemekkel (pl. HTML és CSS segítségével)!
Különösen figyelj oda a négyzetrács megvalósítására! Négyzetes elemek legyenek, kiférjen az oldalra kisebb felbontású kijelzőkön is.
Hogyen jelzed a terepelemeket? Háttérszínnel, háttérképpel?
Lesznek animáióid? Hol, milyenek? Készítsd elő őket!
Viselkedés hozzáadása
A játéklogika
Adatok
Milyen adatok kellenek a játék működtetéséhez?
Másképpen: olyan adatokat érdemes tárolni, amelyek alapján bármelyik pillanatban ki kell tudnod rajzolni a játékot!
Mik a mindenképpen szükséges adatok? És miket lehet származtatni, kiszámolni belőlük? Ez utóbbiakat ne tárold, hanem mindig számold ki!
Például: a négyzetrács egy mátrixszal reprezentálható, benne azt kell tárolni, milyen terepelem van a cellákban. Tárolni kell a húzandó elemeket, a küldetéseket (ld fent). Tárolni kell az eltelt időt. És még mit?
Műveletek
Milyen változások állhatnak be a játékban?
Adatok szintjén mit jelent egy forgatás? Egy tükrözés? Egy lerakás? Vagy éppen az alapállapot elkészítése?
Milyen információkat kell kinyerned az adatokból? Pl. a küldetések kiszámolása. Az évszak meghatározása a tárolt időegységekből?
Az eseménykezelők
Milyen felhasználói tevékenységek milyen eseményeket váltanak ki?
Hova kattinthatsz a felületen?
Mit kell akkor csinálni?
Milyen adatot kell kiolvasni a felületről?
És milyen változást kell végbevinni az adatokon?
A változásokat hogyan jeleníted meg?
Módosítod az elemeket? (imperatív)
Vagy lecseréled őket egy újrarajzolás során? (deklaratív)
Természetesen nem kell ezeket a nagy blokkokat egyben elkészíteni. Lehet lépésenként haladni. Például:

Négyzetrács kirajzolása
statikus prototípus (pl. HTML, CSS)
adatok szintjén mátrix
mátrixból HTML táblázat generálása (előkészítve a deklaratív irányt)
Elemek lehelyezése
statikus prototípus (pl. HTML, CSS)
adatok szintjén a lehelyezendő elemek tárolása (ld fent előkészítve), megkeverése
táblázat cellájára kattintva elhelyezése, ha lehet
stb (tükrözés, forgatás, egérmozgatásra kirajzolás, stb.)
Idő mérése
Küldetések
Évszakok
Megjelenés
Fontos az igényes megjelenés. Ez nem feltétlenül jelenti egy agyon csicsázott oldal elkészítését, de azt igen, hogy 1024x768 felbontásban és afölött az elrendezés jól jelenjen meg, a játéktábla négyzetes cellákat tartalmazzon. Ehhez lehet minimalista designt is alkalmazni, lehet különböző háttérképekkel és grafikus elemekkel felturbózott saját CSS-t készíteni, de lehet bármilyen CSS keretrendszer segítségét is igénybe venni.

Nincs elvárás arra vonatkozóan, hogy milyen technológiával (táblázat, div-ek vagy canvas) oldod meg a feladatot, továbbá a megjelenést és működést illetően sincsenek kőbe vésett elvárások. A lényeg, hogy a fenti feladatok felismerhetők legyenek, és a játék jól játszható legyen.

Beadott munka tisztasága
A beadott munka alapvetően saját, egyéni, önálló szellemi termék kell legyen! Ez nem azt jelenti, hogy ne lehetne pl. dokumentációt használni vagy rákeresni az interneten ötletre, de más hallgatókkal való jelentős kódegyezés vagy nagy mennyiségű internetes átvétel esetén a beadandó bármilyen pótlási/javítási lehetőség nélkül visszautasítható! (Ilyen esetben az érintett hallgató(k) semmilyen módon nem teljesítheti(k) a kurzust ebben a félévben!)

Az egyezések elkerülése végett fokozottan kérjük azt is, hogy a megoldásod NE tedd közzé publikus tárhelyen, GitHub-on vagy bármilyen más platformon legalább a beadás határidejéig! Egyezés esetén nem fogjuk a forrást keresni, hanem minden érintett hallgatót egyformán szankcionálunk, hiszen a megoldás továbbadása vagy közzététele is tanulmányi szabálytalanságnak minősül! (ELTE Hallgatói Követelményrendszer, IK kari különös rész, 377/A. §)

Az alkalmazás megvalósításához NEM használható semmilyen JavaScript keretrendszer vagy függvénykönyvtár — így például tiltott a jQuery, React, stb. bármilyen szintű használata!

Az elkészült feladatot egyetlen .zip archívumként kell feltölteni a kurzus Canvas felületére. A csomagnak tartalmaznia kell minden olyan állományt, amely a futtatáshoz és értékeléshez szükséges (pl. HTML, CSS, médiaelemek, JavaScript).

Az alkalmazás állományain kívül KÖTELEZŐEN beküldenendő még a lenti sablon alapján elkészítendő README.md fájl mellékelése, az abban található nyilatkozat és önellenőrző lista kitöltésével. A beadáskor a hallgató nyilatkozik, hogy elfogadja a csalás esetén lehetséges következményeket, az önellenőrző lista pedig meggyorsítja és pontosabbá teszi az értékelést. A listában tegyél [X] jelet minden olyan feladat elé, amelyet legalább részben megoldottál!

Amennyiben a feltöltött archívum nem/hibásan/kitöltetlenül tartalmazza a nyilatkozatot, az önellenőrző listát vagy valamely szükséges állományt, a beadott munka nem kerül értékelésre, ami a kurzus elvégzésének sikertelenségét eredményezi! A hallgató saját felelőssége, hogy időben meggyőződjön a beadás hiánytalanságáról!

Pontozás
A feladat megoldásával 20 pont szerezhető. Vannak minimum elvárások, melyek teljesítése nélkül a beadandó nem elfogadható. A plusz feladatokért további 10 pont szerezhető. Ha valaki mindent megold, a beadandóra akár 30 pontot is kaphat.

A gyakorlati jegyszerzés JavaScript beadandóhoz kapcsolódó feltételei: minden minimumkövetelmény teljesítése, azaz legalább 8 pont (40%) elérése.

Ne feledd, hogy a beadandó határideje fix, a későket nem fogjuk tudni elfogadni!

Minimálisan teljesítendő (enélkül nem fogadjuk el, 8 pont)
Négyzetrács: A játék elindítása után kirajzolódik a 11x11 térkép kirajzolása a hegyekkel a megfelelő helyen. (1 pont)
Lehelyezés: A térképelemek közül egy véletlenszerűen megjelenik a hozzájuk tartozó időegységekkel. (1 pont)
Lehelyezés: A térképelemet le tudjuk helyezni a négyzetrácsra (bárhova). (2 pont)
Idő: A játék 28 időegységig tart, és a térképelemek lehelyezésével kivonja a térképelemhez tartozó időegységet belőle. (1 pont)
Küldetés: a "Határvidék" küldetés pontszámát ki tudja számolni. (1 pont)
Vége: Minden küldetésnél kiírja, hogy melyik küldetésre hány pontot kaptunk. (1 pont)
Vége: A játék végén, a 28 időegység eltelte után a Határvidék alapküldetéshez tartozó pontszámot kiszámolja, és kiírja hány pontot értünk el. (1 pont)
Az alap feladatok (12 pont)
Lehelyezés: A térképelemet szabályosan tudja lehelyezni. (2 pont)
Lehelyezés: A megjelenített térképelem forgatható, és azt így tudjuk lehelyezni. (1 pont)
Lehelyezés: A megjelenített térképelem tükrözhető, és azt így tudjuk lehelyezni. (1 pont)
Küldetés: a "Az erdő széle" küldetés megjelenik és pontszámát ki tudja számolni. (1 pont)
Küldetés: a "Álmos völgy" küldetés megjelenik és pontszámát ki tudja számolni. (1 pont)
Küldetés: a "Krumpliöntözés" küldetés megjelenik és pontszámát ki tudja számolni. (1 pont)
Évszak: A játék 4 évszakon keresztül tart, minden évszak 7 időegységig tart, az évszakokhoz tartozó küldetéskártyák kiemelődnek. (1 pont)
Évszak: Minden évszak végén kiszámolódik a hozzájuk tartozó küldetésekből az évszak végi pontszám, és a játék folytatódik a következő évszakra. (1 pont)
Küldetés: A hegyek teljes bekerítésével 1 plusz pont szerezhető, amelyek minden évszak (vagy a játék) végén hozzáadódnak a pontszámunkhoz (1 pont)
Játék vége: A játék végén megjelenik a négy évszak alatt szerzett összpontszám (1 pont)
Igényes megjelenés (1 pont)
Extrák (10 pont)
Küldetés: Fasor (1 pont)
Küldetés: Öntözőcsatorna (1 pont)
Küldetés: Gazdag város (1 pont)
Küldetés: Mágusokvölgye (1 pont)
Küldetés: Üres telek (1 pont)
Küldetés: Sorház (1 pont)
Küldetés: Páratlan silók (1 pont)
Küldetés: Gazdag vidék (1 pont)
Mentés: A játék folyamatosan menti állapotát a localStorage-ba. Oldal betöltésekor, ha van itt ilyen mentett állapot, akkor onnan tölti be, egyébként új játék indul. Játék végén törlődik a mentett állapot. (2 pont)
README.md
A README.md fájlban szerepeljen a következő kijelentés (a <> jeleket nem kell beleírni). Ugyanitt az egyes [ ] közötti szóközt cseréld le x-re azokra a részfeladatokra, amit sikerült (akár részben) megoldanod! A megfelelően kitöltött README.md fájl nélkül a megoldást nem fogadjuk el!

<Hallgató neve> 
<Neptun kódja> 
Webprogramozás - számonkérés
Ezt a megoldást a fent írt hallgató küldte be és készítette a Webprogramozás kurzus számonkéréséhez.
Kijelentem, hogy ez a megoldás a saját munkám. Nem másoltam vagy használtam harmadik féltől 
származó megoldásokat. Nem továbbítottam megoldást hallgatótársaimnak, és nem is tettem közzé. 
Az Eötvös Loránd Tudományegyetem Hallgatói Követelményrendszere 
(ELTE szervezeti és működési szabályzata, II. Kötet, 74/C. §) kimondja, hogy mindaddig, 
amíg egy hallgató egy másik hallgató munkáját - vagy legalábbis annak jelentős részét - 
saját munkájaként mutatja be, az fegyelmi vétségnek számít. 
A fegyelmi vétség legsúlyosabb következménye a hallgató elbocsátása az egyetemről.

### Minimálisan teljesítendő (enélkül nem fogadjuk el, 8 pont)
[ ] Négyzetrács: A játék elindítása után kirajzolódik a 11x11 térkép kirajzolása a hegyekkel a megfelelő helyen. (1 pont)
[ ] Lehelyezés: A térképelemek közül egy véletlenszerűen megjelenik a hozzájuk tartozó időegységekkel. (1 pont)
[ ] Lehelyezés: A térképelemet le tudjuk helyezni a négyzetrácsra (bárhova). (2 pont)
[ ] Idő: A játék 28 időegységig tart, és a térképelemek lehelyezésével kivonja a térképelemhez tartozó időegységet belőle. (1 pont)
[ ] Küldetés: a "Határvidék" küldetés pontszámát ki tudja számolni. (1 pont)
[ ] Vége: Minden küldetésnél kiírja, hogy melyik küldetésre hány pontot kaptunk. (1 pont)
[ ] Vége: A játék végén, a 28 időegység eltelte után a Határvidék alapküldetéshez tartozó pontszámot kiszámolja, és kiírja hány pontot értünk el. (1 pont)

### Az alap feladatok (12 pont)
[ ] Lehelyezés: A térképelemet szabályosan tudja lehelyezni. (2 pont)
[ ] Lehelyezés: A megjelenített térképelem forgatható, és azt így tudjuk lehelyezni. (1 pont)
[ ] Lehelyezés: A megjelenített térképelem tükrözhető, és azt így tudjuk lehelyezni. (1 pont)
[ ] Küldetés: a "Az erdő széle" küldetés megjelenik és pontszámát ki tudja számolni. (1 pont)
[ ] Küldetés: a "Álmos völgy" küldetés megjelenik és pontszámát ki tudja számolni. (1 pont)
[ ] Küldetés: a "Krumpliöntözés" küldetés megjelenik és pontszámát ki tudja számolni. (1 pont)
[ ] Évszak: A játék 4 évszakon keresztül tart, minden évszak 7 időegységig tart, az évszakokhoz tartozó küldetéskártyák kiemelődnek. (1 pont)
[ ] Évszak: Minden évszak végén kiszámolódik a hozzájuk tartozó küldetésekből az évszak végi pontszám, és a játék folytatódik a következő évszakra. (1 pont)
[ ] Küldetés: A hegyek teljes bekerítésével 1 plusz pont szerezhető, amelyek minden évszak (vagy a játék) végén hozzáadódnak a pontszámunkhoz (1 pont)
[ ] Játék vége: A játék végén megjelenik a négy évszak alatt szerzett összpontszám (1 pont)
[ ] Igényes megjelenés (1 pont)

### Extrák (10 pont)
[ ] Küldetés: Fasor (1 pont)
[ ] Küldetés: Öntözőcsatorna (1 pont)
[ ] Küldetés: Gazdag város (1 pont)
[ ] Küldetés: Mágusokvölgye (1 pont)
[ ] Küldetés: Üres telek (1 pont)
[ ] Küldetés: Sorház (1 pont)
[ ] Küldetés: Páratlan silók (1 pont)
[ ] Küldetés: Gazdag vidék (1 pont)
[ ] Mentés: A játék folyamatosan menti állapotát a localStorage-ba. Oldal betöltésekor, ha van itt ilyen mentett állapot, akkor onnan tölti be, egyébként új játék indul. Játék végén törlődik a mentett állapot. (2 pont)
