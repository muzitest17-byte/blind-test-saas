import type { Song } from '../types';

export const songs: Song[] = [
  // ══════════════════════════════════════════════════════
  // JAZZ / SWING
  // ══════════════════════════════════════════════════════
  { id:1,  title:"What a Wonderful World",  artist:"Louis Armstrong",      year:1967, genre:'jazz',    decade:'1960s', difficulty:1, deezerQuery:"Louis Armstrong What a Wonderful World" },
  { id:2,  title:"Take Five",               artist:"Dave Brubeck",         year:1959, genre:'jazz',    decade:'1950s', difficulty:2, deezerQuery:"Dave Brubeck Take Five" },
  { id:3,  title:"So What",                 artist:"Miles Davis",          year:1959, genre:'jazz',    decade:'1950s', difficulty:3, deezerQuery:"Miles Davis So What" },
  { id:4,  title:"Summertime",              artist:"Ella Fitzgerald",       year:1958, genre:'jazz',    decade:'1950s', difficulty:2, deezerQuery:"Ella Fitzgerald Summertime" },
  { id:5,  title:"Round Midnight",          artist:"Thelonious Monk",      year:1947, genre:'jazz',    decade:'1940s', difficulty:4, deezerQuery:"Thelonious Monk Round Midnight" },
  { id:6,  title:"A Love Supreme",          artist:"John Coltrane",        year:1964, genre:'jazz',    decade:'1960s', difficulty:4, deezerQuery:"John Coltrane A Love Supreme" },
  { id:7,  title:"Fly Me to the Moon",      artist:"Frank Sinatra",        year:1964, genre:'jazz',    decade:'1960s', difficulty:1, deezerQuery:"Frank Sinatra Fly Me to the Moon" },
  { id:8,  title:"Misty",                   artist:"Erroll Garner",        year:1954, genre:'jazz',    decade:'1950s', difficulty:3, deezerQuery:"Erroll Garner Misty" },
  { id:9,  title:"My Favorite Things",      artist:"John Coltrane",        year:1961, genre:'jazz',    decade:'1960s', difficulty:3, deezerQuery:"John Coltrane My Favorite Things" },
  { id:10, title:"In a Sentimental Mood",   artist:"Duke Ellington",       year:1935, genre:'jazz',    decade:'1940s', difficulty:3, deezerQuery:"Duke Ellington Sentimental Mood" },
  { id:11, title:"Blue in Green",           artist:"Miles Davis",          year:1959, genre:'jazz',    decade:'1950s', difficulty:4, deezerQuery:"Miles Davis Blue in Green" },
  { id:12, title:"Autumn Leaves",           artist:"Miles Davis",          year:1956, genre:'jazz',    decade:'1950s', difficulty:3, deezerQuery:"Miles Davis Autumn Leaves" },
  { id:13, title:"Sing Sing Sing",          artist:"Benny Goodman",        year:1937, genre:'jazz',    decade:'1940s', difficulty:3, deezerQuery:"Benny Goodman Sing Sing Sing" },
  { id:14, title:"Georgia on My Mind",      artist:"Ray Charles",          year:1960, genre:'jazz',    decade:'1960s', difficulty:2, deezerQuery:"Ray Charles Georgia on My Mind" },
  { id:15, title:"The Way You Look Tonight","artist":"Tony Bennett",       year:1956, genre:'jazz',    decade:'1950s', difficulty:3, deezerQuery:"Tony Bennett The Way You Look Tonight" },

  // ══════════════════════════════════════════════════════
  // CHANSON FRANÇAISE
  // ══════════════════════════════════════════════════════
  { id:16, title:"La Vie en Rose",            artist:"Édith Piaf",         year:1946, genre:'french',  decade:'1940s', difficulty:1, deezerQuery:"Edith Piaf La Vie en Rose" },
  { id:17, title:"Non, je ne regrette rien",  artist:"Édith Piaf",         year:1960, genre:'french',  decade:'1960s', difficulty:1, deezerQuery:"Edith Piaf Non je ne regrette rien" },
  { id:18, title:"Les Champs-Élysées",        artist:"Joe Dassin",         year:1969, genre:'french',  decade:'1960s', difficulty:1, deezerQuery:"Joe Dassin Les Champs Elysees" },
  { id:19, title:"Comme d'habitude",          artist:"Claude François",    year:1967, genre:'french',  decade:'1960s', difficulty:2, deezerQuery:"Claude François Comme d habitude" },
  { id:20, title:"Alexandrie Alexandra",      artist:"Claude François",    year:1978, genre:'french',  decade:'1970s', difficulty:1, deezerQuery:"Claude François Alexandrie Alexandra" },
  { id:21, title:"Cette année-là",            artist:"Claude François",    year:1975, genre:'french',  decade:'1970s', difficulty:2, deezerQuery:"Claude François Cette année là" },
  { id:22, title:"L'été indien",              artist:"Joe Dassin",         year:1975, genre:'french',  decade:'1970s', difficulty:2, deezerQuery:"Joe Dassin ete indien" },
  { id:23, title:"La Bohème",                 artist:"Charles Aznavour",   year:1965, genre:'french',  decade:'1960s', difficulty:2, deezerQuery:"Charles Aznavour La Boheme" },
  { id:24, title:"Ne me quitte pas",          artist:"Jacques Brel",       year:1959, genre:'french',  decade:'1950s', difficulty:2, deezerQuery:"Jacques Brel Ne me quitte pas" },
  { id:25, title:"Amsterdam",                 artist:"Jacques Brel",       year:1964, genre:'french',  decade:'1960s', difficulty:3, deezerQuery:"Jacques Brel Amsterdam" },
  { id:26, title:"La Mer",                    artist:"Charles Trenet",     year:1946, genre:'french',  decade:'1940s', difficulty:2, deezerQuery:"Charles Trenet La Mer" },
  { id:27, title:"Papaoutai",                 artist:"Stromae",            year:2013, genre:'french',  decade:'2010s', difficulty:1, deezerQuery:"Stromae Papaoutai" },
  { id:28, title:"Formidable",                artist:"Stromae",            year:2013, genre:'french',  decade:'2010s', difficulty:2, deezerQuery:"Stromae Formidable" },
  { id:29, title:"Je veux",                   artist:"Zaz",                year:2010, genre:'french',  decade:'2010s', difficulty:2, deezerQuery:"Zaz Je veux" },
  { id:30, title:"La Bamba",                  artist:"Manu Chao",          year:1988, genre:'french',  decade:'1980s', difficulty:3, deezerQuery:"Manu Chao Bienvenido a Tijuana" },
  { id:31, title:"Sous le vent",              artist:"Garou & Celine Dion",year:2001, genre:'french',  decade:'2000s', difficulty:2, deezerQuery:"Garou Celine Dion Sous le vent" },

  // ══════════════════════════════════════════════════════
  // ROCK 50s / 60s
  // ══════════════════════════════════════════════════════
  { id:32, title:"Johnny B. Goode",          artist:"Chuck Berry",          year:1958, genre:'rock',   decade:'1950s', difficulty:1, deezerQuery:"Chuck Berry Johnny B Goode" },
  { id:33, title:"Hound Dog",                artist:"Elvis Presley",        year:1956, genre:'rock',   decade:'1950s', difficulty:1, deezerQuery:"Elvis Presley Hound Dog" },
  { id:34, title:"Great Balls of Fire",       artist:"Jerry Lee Lewis",      year:1957, genre:'rock',   decade:'1950s', difficulty:1, deezerQuery:"Jerry Lee Lewis Great Balls of Fire" },
  { id:35, title:"Rock Around the Clock",     artist:"Bill Haley",           year:1954, genre:'rock',   decade:'1950s', difficulty:1, deezerQuery:"Bill Haley Rock Around the Clock" },
  { id:36, title:"Jailhouse Rock",            artist:"Elvis Presley",        year:1957, genre:'rock',   decade:'1950s', difficulty:1, deezerQuery:"Elvis Presley Jailhouse Rock" },
  { id:37, title:"Hey Jude",                 artist:"The Beatles",          year:1968, genre:'rock',   decade:'1960s', difficulty:1, deezerQuery:"The Beatles Hey Jude" },
  { id:38, title:"Let It Be",                artist:"The Beatles",          year:1970, genre:'rock',   decade:'1970s', difficulty:1, deezerQuery:"The Beatles Let It Be" },
  { id:39, title:"Yesterday",                artist:"The Beatles",          year:1965, genre:'rock',   decade:'1960s', difficulty:1, deezerQuery:"The Beatles Yesterday" },
  { id:40, title:"Come Together",            artist:"The Beatles",          year:1969, genre:'rock',   decade:'1960s', difficulty:2, deezerQuery:"The Beatles Come Together" },
  { id:41, title:"Paint It Black",           artist:"The Rolling Stones",   year:1966, genre:'rock',   decade:'1960s', difficulty:2, deezerQuery:"Rolling Stones Paint It Black" },
  { id:42, title:"Sympathy for the Devil",   artist:"The Rolling Stones",   year:1968, genre:'rock',   decade:'1960s', difficulty:2, deezerQuery:"Rolling Stones Sympathy Devil" },
  { id:43, title:"Brown Sugar",              artist:"The Rolling Stones",   year:1971, genre:'rock',   decade:'1970s', difficulty:3, deezerQuery:"Rolling Stones Brown Sugar" },

  // ══════════════════════════════════════════════════════
  // ROCK CLASSIQUE 70s / 80s
  // ══════════════════════════════════════════════════════
  { id:44, title:"Stairway to Heaven",        artist:"Led Zeppelin",        year:1971, genre:'rock',   decade:'1970s', difficulty:1, deezerQuery:"Led Zeppelin Stairway to Heaven" },
  { id:45, title:"Hotel California",          artist:"Eagles",              year:1977, genre:'rock',   decade:'1970s', difficulty:1, deezerQuery:"Eagles Hotel California" },
  { id:46, title:"Bohemian Rhapsody",         artist:"Queen",               year:1975, genre:'rock',   decade:'1970s', difficulty:1, deezerQuery:"Queen Bohemian Rhapsody" },
  { id:47, title:"We Will Rock You",          artist:"Queen",               year:1977, genre:'rock',   decade:'1970s', difficulty:1, deezerQuery:"Queen We Will Rock You" },
  { id:48, title:"Don't Stop Me Now",         artist:"Queen",               year:1978, genre:'rock',   decade:'1970s', difficulty:1, deezerQuery:"Queen Don't Stop Me Now" },
  { id:49, title:"Smoke on the Water",        artist:"Deep Purple",         year:1972, genre:'rock',   decade:'1970s', difficulty:1, deezerQuery:"Deep Purple Smoke on the Water" },
  { id:50, title:"Born to Run",              artist:"Bruce Springsteen",   year:1975, genre:'rock',   decade:'1970s', difficulty:2, deezerQuery:"Bruce Springsteen Born to Run" },
  { id:51, title:"Sweet Child O' Mine",       artist:"Guns N' Roses",       year:1987, genre:'rock',   decade:'1980s', difficulty:1, deezerQuery:"Guns N Roses Sweet Child O Mine" },
  { id:52, title:"Back in Black",             artist:"AC/DC",               year:1980, genre:'rock',   decade:'1980s', difficulty:1, deezerQuery:"ACDC Back in Black" },
  { id:53, title:"Jump",                     artist:"Van Halen",           year:1984, genre:'rock',   decade:'1980s', difficulty:1, deezerQuery:"Van Halen Jump" },
  { id:54, title:"Eye of the Tiger",          artist:"Survivor",            year:1982, genre:'rock',   decade:'1980s', difficulty:1, deezerQuery:"Survivor Eye of the Tiger" },
  { id:55, title:"Don't You (Forget About Me)","artist":"Simple Minds",    year:1985, genre:'rock',   decade:'1980s', difficulty:2, deezerQuery:"Simple Minds Don't You Forget About Me" },
  { id:56, title:"Total Eclipse of the Heart","artist":"Bonnie Tyler",     year:1983, genre:'rock',   decade:'1980s', difficulty:1, deezerQuery:"Bonnie Tyler Total Eclipse" },
  { id:57, title:"Africa",                   artist:"Toto",                year:1982, genre:'rock',   decade:'1980s', difficulty:1, deezerQuery:"Toto Africa" },
  { id:58, title:"Girls Just Want to Have Fun","artist":"Cyndi Lauper",    year:1983, genre:'pop',    decade:'1980s', difficulty:1, deezerQuery:"Cyndi Lauper Girls Just Want Fun" },
  { id:59, title:"Livin' on a Prayer",        artist:"Bon Jovi",           year:1986, genre:'rock',   decade:'1980s', difficulty:1, deezerQuery:"Bon Jovi Livin on a Prayer" },
  { id:60, title:"You Give Love a Bad Name",  artist:"Bon Jovi",           year:1986, genre:'rock',   decade:'1980s', difficulty:2, deezerQuery:"Bon Jovi Bad Name" },
  { id:61, title:"Wake Me Up Before You Go-Go","artist":"Wham!",           year:1984, genre:'pop',    decade:'1980s', difficulty:1, deezerQuery:"Wham Wake Me Up Before You Go Go" },

  // ══════════════════════════════════════════════════════
  // GRUNGE / ROCK ALTERNATIF 90s
  // ══════════════════════════════════════════════════════
  { id:62, title:"Smells Like Teen Spirit",   artist:"Nirvana",             year:1991, genre:'rock',   decade:'1990s', difficulty:1, deezerQuery:"Nirvana Smells Like Teen Spirit" },
  { id:63, title:"Come As You Are",          artist:"Nirvana",             year:1991, genre:'rock',   decade:'1990s', difficulty:2, deezerQuery:"Nirvana Come As You Are" },
  { id:64, title:"Black Hole Sun",            artist:"Soundgarden",        year:1994, genre:'rock',   decade:'1990s', difficulty:2, deezerQuery:"Soundgarden Black Hole Sun" },
  { id:65, title:"Creep",                    artist:"Radiohead",           year:1992, genre:'rock',   decade:'1990s', difficulty:1, deezerQuery:"Radiohead Creep" },
  { id:66, title:"Under the Bridge",          artist:"Red Hot Chili Peppers",year:1992,genre:'rock',  decade:'1990s', difficulty:2, deezerQuery:"Red Hot Chili Peppers Under the Bridge" },
  { id:67, title:"Californication",          artist:"Red Hot Chili Peppers",year:1999,genre:'rock',   decade:'1990s', difficulty:2, deezerQuery:"Red Hot Chili Peppers Californication" },
  { id:68, title:"Mr. Jones",                artist:"Counting Crows",      year:1993, genre:'rock',   decade:'1990s', difficulty:3, deezerQuery:"Counting Crows Mr Jones" },
  { id:69, title:"What's Up",                artist:"4 Non Blondes",       year:1992, genre:'rock',   decade:'1990s', difficulty:2, deezerQuery:"4 Non Blondes Whats Up" },
  { id:70, title:"Zombie",                   artist:"The Cranberries",     year:1994, genre:'rock',   decade:'1990s', difficulty:1, deezerQuery:"The Cranberries Zombie" },
  { id:71, title:"Wonderwall",               artist:"Oasis",               year:1995, genre:'rock',   decade:'1990s', difficulty:1, deezerQuery:"Oasis Wonderwall" },

  // ══════════════════════════════════════════════════════
  // MÉTAL
  // ══════════════════════════════════════════════════════
  { id:72, title:"Master of Puppets",        artist:"Metallica",           year:1986, genre:'metal',  decade:'1980s', difficulty:2, deezerQuery:"Metallica Master of Puppets" },
  { id:73, title:"Paranoid",                 artist:"Black Sabbath",       year:1970, genre:'metal',  decade:'1970s', difficulty:2, deezerQuery:"Black Sabbath Paranoid" },
  { id:74, title:"Iron Man",                 artist:"Black Sabbath",       year:1970, genre:'metal',  decade:'1970s', difficulty:2, deezerQuery:"Black Sabbath Iron Man" },
  { id:75, title:"Enter Sandman",             artist:"Metallica",           year:1991, genre:'metal',  decade:'1990s', difficulty:1, deezerQuery:"Metallica Enter Sandman" },
  { id:76, title:"Nothing Else Matters",     artist:"Metallica",           year:1991, genre:'metal',  decade:'1990s', difficulty:2, deezerQuery:"Metallica Nothing Else Matters" },
  { id:77, title:"Highway to Hell",          artist:"AC/DC",               year:1979, genre:'metal',  decade:'1970s', difficulty:1, deezerQuery:"ACDC Highway to Hell" },
  { id:78, title:"Thunderstruck",            artist:"AC/DC",               year:1990, genre:'metal',  decade:'1990s', difficulty:1, deezerQuery:"ACDC Thunderstruck" },

  // ══════════════════════════════════════════════════════
  // REGGAE
  // ══════════════════════════════════════════════════════
  { id:79, title:"No Woman No Cry",          artist:"Bob Marley",          year:1974, genre:'reggae', decade:'1970s', difficulty:1, deezerQuery:"Bob Marley No Woman No Cry" },
  { id:80, title:"One Love",                 artist:"Bob Marley",          year:1977, genre:'reggae', decade:'1970s', difficulty:1, deezerQuery:"Bob Marley One Love" },
  { id:81, title:"Redemption Song",           artist:"Bob Marley",          year:1980, genre:'reggae', decade:'1980s', difficulty:2, deezerQuery:"Bob Marley Redemption Song" },
  { id:82, title:"Is This Love",             artist:"Bob Marley",          year:1978, genre:'reggae', decade:'1970s', difficulty:2, deezerQuery:"Bob Marley Is This Love" },
  { id:83, title:"The Harder They Come",      artist:"Jimmy Cliff",         year:1972, genre:'reggae', decade:'1970s', difficulty:3, deezerQuery:"Jimmy Cliff The Harder They Come" },
  { id:84, title:"Red Red Wine",              artist:"UB40",                year:1983, genre:'reggae', decade:'1980s', difficulty:1, deezerQuery:"UB40 Red Red Wine" },
  { id:85, title:"Kingston Town",            artist:"UB40",                year:1990, genre:'reggae', decade:'1990s', difficulty:3, deezerQuery:"UB40 Kingston Town" },

  // ══════════════════════════════════════════════════════
  // SOUL & FUNK
  // ══════════════════════════════════════════════════════
  { id:86, title:"Respect",                  artist:"Aretha Franklin",     year:1967, genre:'soul',   decade:'1960s', difficulty:1, deezerQuery:"Aretha Franklin Respect" },
  { id:87, title:"I Got You (I Feel Good)",  artist:"James Brown",         year:1965, genre:'funk',   decade:'1960s', difficulty:1, deezerQuery:"James Brown I Feel Good" },
  { id:88, title:"Superstition",             artist:"Stevie Wonder",       year:1972, genre:'soul',   decade:'1970s', difficulty:1, deezerQuery:"Stevie Wonder Superstition" },
  { id:89, title:"Sir Duke",                 artist:"Stevie Wonder",       year:1976, genre:'soul',   decade:'1970s', difficulty:2, deezerQuery:"Stevie Wonder Sir Duke" },
  { id:90, title:"Sex Machine",              artist:"James Brown",         year:1970, genre:'funk',   decade:'1970s', difficulty:2, deezerQuery:"James Brown Sex Machine" },
  { id:91, title:"September",                artist:"Earth, Wind & Fire",  year:1978, genre:'soul',   decade:'1970s', difficulty:1, deezerQuery:"Earth Wind Fire September" },
  { id:92, title:"Le Freak",                 artist:"Chic",                year:1978, genre:'funk',   decade:'1970s', difficulty:2, deezerQuery:"Chic Le Freak" },
  { id:93, title:"Superstition",             artist:"Stevie Wonder",       year:1972, genre:'soul',   decade:'1970s', difficulty:1, deezerQuery:"Stevie Wonder Superstition" },
  { id:94, title:"You Are the Sunshine",     artist:"Stevie Wonder",       year:1973, genre:'soul',   decade:'1970s', difficulty:2, deezerQuery:"Stevie Wonder Sunshine of my life" },
  { id:95, title:"Ain't No Sunshine",        artist:"Bill Withers",        year:1971, genre:'soul',   decade:'1970s', difficulty:2, deezerQuery:"Bill Withers Ain't No Sunshine" },
  { id:96, title:"Lean on Me",               artist:"Bill Withers",        year:1972, genre:'soul',   decade:'1970s', difficulty:2, deezerQuery:"Bill Withers Lean on Me" },

  // ══════════════════════════════════════════════════════
  // DISCO
  // ══════════════════════════════════════════════════════
  { id:97, title:"Stayin' Alive",            artist:"Bee Gees",            year:1977, genre:'disco',  decade:'1970s', difficulty:1, deezerQuery:"Bee Gees Stayin Alive" },
  { id:98, title:"Night Fever",              artist:"Bee Gees",            year:1977, genre:'disco',  decade:'1970s', difficulty:2, deezerQuery:"Bee Gees Night Fever" },
  { id:99, title:"I Will Survive",           artist:"Gloria Gaynor",       year:1978, genre:'disco',  decade:'1970s', difficulty:1, deezerQuery:"Gloria Gaynor I Will Survive" },
  { id:100,title:"Good Times",               artist:"Chic",                year:1979, genre:'disco',  decade:'1970s', difficulty:3, deezerQuery:"Chic Good Times" },
  { id:101,title:"YMCA",                     artist:"Village People",      year:1978, genre:'disco',  decade:'1970s', difficulty:1, deezerQuery:"Village People YMCA" },
  { id:102,title:"Dancing Queen",            artist:"ABBA",                year:1976, genre:'disco',  decade:'1970s', difficulty:1, deezerQuery:"ABBA Dancing Queen" },
  { id:103,title:"Waterloo",                 artist:"ABBA",                year:1974, genre:'disco',  decade:'1970s', difficulty:1, deezerQuery:"ABBA Waterloo" },
  { id:104,title:"Voulez-Vous",              artist:"ABBA",                year:1979, genre:'disco',  decade:'1970s', difficulty:2, deezerQuery:"ABBA Voulez Vous" },

  // ══════════════════════════════════════════════════════
  // POP 80s
  // ══════════════════════════════════════════════════════
  { id:105,title:"Thriller",                 artist:"Michael Jackson",     year:1982, genre:'pop',    decade:'1980s', difficulty:1, deezerQuery:"Michael Jackson Thriller" },
  { id:106,title:"Billie Jean",              artist:"Michael Jackson",     year:1982, genre:'pop',    decade:'1980s', difficulty:1, deezerQuery:"Michael Jackson Billie Jean" },
  { id:107,title:"Beat It",                 artist:"Michael Jackson",     year:1982, genre:'pop',    decade:'1980s', difficulty:1, deezerQuery:"Michael Jackson Beat It" },
  { id:108,title:"Like a Prayer",            artist:"Madonna",             year:1989, genre:'pop',    decade:'1980s', difficulty:1, deezerQuery:"Madonna Like a Prayer" },
  { id:109,title:"Material Girl",            artist:"Madonna",             year:1984, genre:'pop',    decade:'1980s', difficulty:1, deezerQuery:"Madonna Material Girl" },
  { id:110,title:"Like a Virgin",            artist:"Madonna",             year:1984, genre:'pop',    decade:'1980s', difficulty:1, deezerQuery:"Madonna Like a Virgin" },
  { id:111,title:"Don't You Want Me",        artist:"Human League",        year:1981, genre:'pop',    decade:'1980s', difficulty:2, deezerQuery:"Human League Don't You Want Me" },
  { id:112,title:"Sweet Dreams",             artist:"Eurythmics",          year:1983, genre:'pop',    decade:'1980s', difficulty:1, deezerQuery:"Eurythmics Sweet Dreams" },

  // ══════════════════════════════════════════════════════
  // POP 90s
  // ══════════════════════════════════════════════════════
  { id:113,title:"...Baby One More Time",    artist:"Britney Spears",     year:1998, genre:'pop',    decade:'1990s', difficulty:1, deezerQuery:"Britney Spears Baby One More Time" },
  { id:114,title:"Wannabe",                  artist:"Spice Girls",         year:1996, genre:'pop',    decade:'1990s', difficulty:1, deezerQuery:"Spice Girls Wannabe" },
  { id:115,title:"My Heart Will Go On",      artist:"Celine Dion",        year:1997, genre:'pop',    decade:'1990s', difficulty:1, deezerQuery:"Celine Dion My Heart Will Go On" },
  { id:116,title:"Livin' la Vida Loca",      artist:"Ricky Martin",       year:1999, genre:'pop',    decade:'1990s', difficulty:1, deezerQuery:"Ricky Martin Livin la Vida Loca" },
  { id:117,title:"MMMBop",                   artist:"Hanson",              year:1997, genre:'pop',    decade:'1990s', difficulty:2, deezerQuery:"Hanson MMMBop" },
  { id:118,title:"Believe",                  artist:"Cher",                year:1998, genre:'pop',    decade:'1990s', difficulty:1, deezerQuery:"Cher Believe" },
  { id:119,title:"Macarena",                 artist:"Los Del Rio",         year:1995, genre:'pop',    decade:'1990s', difficulty:1, deezerQuery:"Los Del Rio Macarena" },
  { id:120,title:"Torn",                     artist:"Natalie Imbruglia",   year:1997, genre:'pop',    decade:'1990s', difficulty:2, deezerQuery:"Natalie Imbruglia Torn" },
  { id:121,title:"Barbie Girl",              artist:"Aqua",                year:1997, genre:'pop',    decade:'1990s', difficulty:1, deezerQuery:"Aqua Barbie Girl" },

  // ══════════════════════════════════════════════════════
  // ÉLECTRONIQUE / DANCE
  // ══════════════════════════════════════════════════════
  { id:122,title:"Around the World",         artist:"Daft Punk",           year:1997, genre:'electronic',decade:'1990s',difficulty:1, deezerQuery:"Daft Punk Around the World" },
  { id:123,title:"One More Time",            artist:"Daft Punk",           year:2000, genre:'electronic',decade:'2000s',difficulty:1, deezerQuery:"Daft Punk One More Time" },
  { id:124,title:"Get Lucky",                artist:"Daft Punk",           year:2013, genre:'electronic',decade:'2010s',difficulty:1, deezerQuery:"Daft Punk Get Lucky" },
  { id:125,title:"Harder Better Faster",     artist:"Daft Punk",           year:2001, genre:'electronic',decade:'2000s',difficulty:2, deezerQuery:"Daft Punk Harder Better Faster" },
  { id:126,title:"Blue (Da Ba Dee)",         artist:"Eiffel 65",           year:1998, genre:'electronic',decade:'1990s',difficulty:1, deezerQuery:"Eiffel 65 Blue Da Ba Dee" },
  { id:127,title:"Sandstorm",                artist:"Darude",              year:1999, genre:'electronic',decade:'1990s',difficulty:1, deezerQuery:"Darude Sandstorm" },
  { id:128,title:"Levels",                   artist:"Avicii",              year:2011, genre:'electronic',decade:'2010s',difficulty:1, deezerQuery:"Avicii Levels" },
  { id:129,title:"Wake Me Up",               artist:"Avicii",              year:2013, genre:'electronic',decade:'2010s',difficulty:1, deezerQuery:"Avicii Wake Me Up" },
  { id:130,title:"Animals",                  artist:"Martin Garrix",       year:2013, genre:'electronic',decade:'2010s',difficulty:2, deezerQuery:"Martin Garrix Animals" },
  { id:131,title:"Titanium",                 artist:"David Guetta",        year:2011, genre:'electronic',decade:'2010s',difficulty:1, deezerQuery:"David Guetta Titanium" },
  { id:132,title:"Pump Up the Jam",          artist:"Technotronic",        year:1989, genre:'electronic',decade:'1980s',difficulty:2, deezerQuery:"Technotronic Pump Up the Jam" },
  { id:133,title:"The Final Countdown",      artist:"Europe",              year:1986, genre:'rock',   decade:'1980s', difficulty:1, deezerQuery:"Europe The Final Countdown" },
  { id:134,title:"Freed from Desire",        artist:"Gala",                year:1997, genre:'electronic',decade:'1990s',difficulty:2, deezerQuery:"Gala Freed from Desire" },
  { id:135,title:"Show Me Love",             artist:"Robin S",             year:1993, genre:'electronic',decade:'1990s',difficulty:2, deezerQuery:"Robin S Show Me Love" },
  { id:136,title:"Scatman (Ski-Ba-Bop)",     artist:"Scatman John",        year:1994, genre:'electronic',decade:'1990s',difficulty:1, deezerQuery:"Scatman John Scatman" },

  // ══════════════════════════════════════════════════════
  // HIP-HOP / RAP
  // ══════════════════════════════════════════════════════
  { id:137,title:"Lose Yourself",            artist:"Eminem",              year:2002, genre:'hiphop', decade:'2000s', difficulty:1, deezerQuery:"Eminem Lose Yourself" },
  { id:138,title:"Stan",                     artist:"Eminem",              year:2000, genre:'hiphop', decade:'2000s', difficulty:2, deezerQuery:"Eminem Stan" },
  { id:139,title:"Stronger",                artist:"Kanye West",          year:2007, genre:'hiphop', decade:'2000s', difficulty:1, deezerQuery:"Kanye West Stronger" },
  { id:140,title:"HUMBLE.",                  artist:"Kendrick Lamar",      year:2017, genre:'hiphop', decade:'2010s', difficulty:2, deezerQuery:"Kendrick Lamar HUMBLE" },
  { id:141,title:"God's Plan",              artist:"Drake",               year:2018, genre:'hiphop', decade:'2010s', difficulty:1, deezerQuery:"Drake God's Plan" },
  { id:142,title:"Hotline Bling",            artist:"Drake",               year:2015, genre:'hiphop', decade:'2010s', difficulty:1, deezerQuery:"Drake Hotline Bling" },
  { id:143,title:"In Da Club",               artist:"50 Cent",             year:2003, genre:'hiphop', decade:'2000s', difficulty:1, deezerQuery:"50 Cent In Da Club" },
  { id:144,title:"Yeah!",                   artist:"Usher",               year:2004, genre:'hiphop', decade:'2000s', difficulty:1, deezerQuery:"Usher Yeah" },
  { id:145,title:"Gold Digger",              artist:"Kanye West",          year:2005, genre:'hiphop', decade:'2000s', difficulty:2, deezerQuery:"Kanye West Gold Digger" },

  // ══════════════════════════════════════════════════════
  // POP 2000s / 2010s / 2020s
  // ══════════════════════════════════════════════════════
  { id:146,title:"Rolling in the Deep",      artist:"Adele",               year:2010, genre:'pop',    decade:'2010s', difficulty:1, deezerQuery:"Adele Rolling in the Deep" },
  { id:147,title:"Someone Like You",         artist:"Adele",               year:2011, genre:'pop',    decade:'2010s', difficulty:1, deezerQuery:"Adele Someone Like You" },
  { id:148,title:"Shape of You",             artist:"Ed Sheeran",          year:2017, genre:'pop',    decade:'2010s', difficulty:1, deezerQuery:"Ed Sheeran Shape of You" },
  { id:149,title:"Thinking Out Loud",        artist:"Ed Sheeran",          year:2014, genre:'pop',    decade:'2010s', difficulty:2, deezerQuery:"Ed Sheeran Thinking Out Loud" },
  { id:150,title:"Bad Guy",                 artist:"Billie Eilish",        year:2019, genre:'pop',    decade:'2010s', difficulty:1, deezerQuery:"Billie Eilish Bad Guy" },
  { id:151,title:"Blinding Lights",          artist:"The Weeknd",          year:2019, genre:'pop',    decade:'2010s', difficulty:1, deezerQuery:"The Weeknd Blinding Lights" },
  { id:152,title:"Despacito",                artist:"Luis Fonsi",          year:2017, genre:'pop',    decade:'2010s', difficulty:1, deezerQuery:"Luis Fonsi Despacito" },
  { id:153,title:"Happy",                   artist:"Pharrell Williams",   year:2013, genre:'pop',    decade:'2010s', difficulty:1, deezerQuery:"Pharrell Williams Happy" },
  { id:154,title:"Uptown Funk",              artist:"Mark Ronson ft. Bruno Mars",year:2014,genre:'pop',decade:'2010s',difficulty:1, deezerQuery:"Mark Ronson Uptown Funk" },
  { id:155,title:"Sorry",                   artist:"Justin Bieber",       year:2015, genre:'pop',    decade:'2010s', difficulty:1, deezerQuery:"Justin Bieber Sorry" },
  { id:156,title:"Poker Face",               artist:"Lady Gaga",           year:2008, genre:'pop',    decade:'2000s', difficulty:1, deezerQuery:"Lady Gaga Poker Face" },
  { id:157,title:"Bad Romance",              artist:"Lady Gaga",           year:2009, genre:'pop',    decade:'2000s', difficulty:1, deezerQuery:"Lady Gaga Bad Romance" },
  { id:158,title:"As It Was",               artist:"Harry Styles",        year:2022, genre:'pop',    decade:'2020s', difficulty:1, deezerQuery:"Harry Styles As It Was" },
  { id:159,title:"Flowers",                 artist:"Miley Cyrus",         year:2023, genre:'pop',    decade:'2020s', difficulty:1, deezerQuery:"Miley Cyrus Flowers" },
  { id:160,title:"Anti-Hero",               artist:"Taylor Swift",        year:2022, genre:'pop',    decade:'2020s', difficulty:1, deezerQuery:"Taylor Swift Anti-Hero" },
  { id:161,title:"Shake It Off",            artist:"Taylor Swift",        year:2014, genre:'pop',    decade:'2010s', difficulty:1, deezerQuery:"Taylor Swift Shake It Off" },
  { id:162,title:"Dynamite",                artist:"BTS",                 year:2020, genre:'pop',    decade:'2020s', difficulty:2, deezerQuery:"BTS Dynamite" },
  { id:163,title:"Butter",                  artist:"BTS",                 year:2021, genre:'pop',    decade:'2020s', difficulty:2, deezerQuery:"BTS Butter" },

  // ══════════════════════════════════════════════════════
  // ANNÉES 40 — SWING & JAZZ POPULAIRE (renfort débutant)
  // ══════════════════════════════════════════════════════
  { id:164, title:"In the Mood",              artist:"Glenn Miller",         year:1940, genre:'jazz',   decade:'1940s', difficulty:1, deezerQuery:"Glenn Miller In the Mood" },
  { id:165, title:"Moonlight Serenade",       artist:"Glenn Miller",         year:1940, genre:'jazz',   decade:'1940s', difficulty:1, deezerQuery:"Glenn Miller Moonlight Serenade" },
  { id:166, title:"Chattanooga Choo Choo",    artist:"Glenn Miller",         year:1941, genre:'jazz',   decade:'1940s', difficulty:1, deezerQuery:"Glenn Miller Chattanooga Choo Choo" },
  { id:167, title:"Boogie Woogie Bugle Boy",  artist:"Andrews Sisters",      year:1941, genre:'jazz',   decade:'1940s', difficulty:1, deezerQuery:"Andrews Sisters Boogie Woogie Bugle Boy" },
  { id:168, title:"White Christmas",          artist:"Bing Crosby",          year:1942, genre:'jazz',   decade:'1940s', difficulty:1, deezerQuery:"Bing Crosby White Christmas" },
  { id:169, title:"Sentimental Journey",      artist:"Doris Day",            year:1945, genre:'jazz',   decade:'1940s', difficulty:2, deezerQuery:"Doris Day Sentimental Journey" },
  { id:170, title:"Rum and Coca-Cola",        artist:"Andrews Sisters",      year:1944, genre:'jazz',   decade:'1940s', difficulty:2, deezerQuery:"Andrews Sisters Rum and Coca Cola" },
  { id:171, title:"Take the A Train",         artist:"Duke Ellington",       year:1941, genre:'jazz',   decade:'1940s', difficulty:2, deezerQuery:"Duke Ellington Take the A Train" },
  { id:172, title:"Stompin' at the Savoy",    artist:"Benny Goodman",        year:1944, genre:'jazz',   decade:'1940s', difficulty:2, deezerQuery:"Benny Goodman Stompin at the Savoy" },
  { id:173, title:"Mairzy Doats",             artist:"Merry Macs",           year:1943, genre:'jazz',   decade:'1940s', difficulty:2, deezerQuery:"Merry Macs Mairzy Doats" },
  { id:174, title:"How High the Moon",        artist:"Ella Fitzgerald",      year:1947, genre:'jazz',   decade:'1940s', difficulty:2, deezerQuery:"Ella Fitzgerald How High the Moon" },
  { id:175, title:"Nature Boy",               artist:"Nat King Cole",        year:1948, genre:'jazz',   decade:'1940s', difficulty:2, deezerQuery:"Nat King Cole Nature Boy" },
  { id:176, title:"Mona Lisa",                artist:"Nat King Cole",        year:1950, genre:'jazz',   decade:'1950s', difficulty:1, deezerQuery:"Nat King Cole Mona Lisa" },
  { id:177, title:"Unforgettable",            artist:"Nat King Cole",        year:1951, genre:'jazz',   decade:'1950s', difficulty:1, deezerQuery:"Nat King Cole Unforgettable" },

  // ══════════════════════════════════════════════════════
  // ANNÉES 50 — ROCK'N'ROLL & POP (renforts)
  // ══════════════════════════════════════════════════════
  { id:178, title:"Love Me Tender",           artist:"Elvis Presley",        year:1956, genre:'rock',   decade:'1950s', difficulty:1, deezerQuery:"Elvis Presley Love Me Tender" },
  { id:179, title:"Tutti Frutti",             artist:"Little Richard",       year:1955, genre:'rock',   decade:'1950s', difficulty:1, deezerQuery:"Little Richard Tutti Frutti" },
  { id:180, title:"Whole Lotta Shakin' Goin On","artist":"Jerry Lee Lewis",  year:1957, genre:'rock',   decade:'1950s', difficulty:2, deezerQuery:"Jerry Lee Lewis Whole Lotta Shakin" },
  { id:181, title:"Peggy Sue",                artist:"Buddy Holly",          year:1957, genre:'rock',   decade:'1950s', difficulty:2, deezerQuery:"Buddy Holly Peggy Sue" },
  { id:182, title:"Blue Suede Shoes",         artist:"Elvis Presley",        year:1956, genre:'rock',   decade:'1950s', difficulty:1, deezerQuery:"Elvis Presley Blue Suede Shoes" },
  { id:183, title:"Que Sera Sera",            artist:"Doris Day",            year:1956, genre:'pop',    decade:'1950s', difficulty:1, deezerQuery:"Doris Day Que Sera Sera" },
  { id:184, title:"That'll Be the Day",       artist:"Buddy Holly",          year:1957, genre:'rock',   decade:'1950s', difficulty:2, deezerQuery:"Buddy Holly That'll Be the Day" },

  // ══════════════════════════════════════════════════════
  // ANNÉES 60 — HITS POPULAIRES (renforts)
  // ══════════════════════════════════════════════════════
  { id:185, title:"Stand By Me",              artist:"Ben E. King",          year:1961, genre:'soul',   decade:'1960s', difficulty:1, deezerQuery:"Ben E King Stand By Me" },
  { id:186, title:"House of the Rising Sun",  artist:"The Animals",          year:1964, genre:'rock',   decade:'1960s', difficulty:1, deezerQuery:"The Animals House of the Rising Sun" },
  { id:187, title:"(Sittin' On) The Dock of the Bay","artist":"Otis Redding",year:1968,genre:'soul',   decade:'1960s', difficulty:2, deezerQuery:"Otis Redding Dock of the Bay" },
  { id:188, title:"Light My Fire",            artist:"The Doors",            year:1967, genre:'rock',   decade:'1960s', difficulty:2, deezerQuery:"The Doors Light My Fire" },
  { id:189, title:"Good Vibrations",          artist:"Beach Boys",           year:1966, genre:'pop',    decade:'1960s', difficulty:2, deezerQuery:"Beach Boys Good Vibrations" },
  { id:190, title:"Help!",                    artist:"The Beatles",          year:1965, genre:'rock',   decade:'1960s', difficulty:1, deezerQuery:"The Beatles Help" },
  { id:191, title:"Twist and Shout",          artist:"The Beatles",          year:1963, genre:'rock',   decade:'1960s', difficulty:1, deezerQuery:"The Beatles Twist and Shout" },
  { id:192, title:"Mr. Tambourine Man",       artist:"Bob Dylan",            year:1965, genre:'rock',   decade:'1960s', difficulty:2, deezerQuery:"Bob Dylan Mr Tambourine Man" },
  { id:193, title:"Blowin' in the Wind",      artist:"Bob Dylan",            year:1963, genre:'rock',   decade:'1960s', difficulty:2, deezerQuery:"Bob Dylan Blowin in the Wind" },
  { id:194, title:"River Deep Mountain High", artist:"Ike & Tina Turner",    year:1966, genre:'soul',   decade:'1960s', difficulty:2, deezerQuery:"Ike Tina Turner River Deep Mountain High" },
  { id:195, title:"La Paloma",               artist:"Nana Mouskouri",       year:1962, genre:'french', decade:'1960s', difficulty:1, deezerQuery:"Nana Mouskouri La Paloma" },

  // ══════════════════════════════════════════════════════
  // ANNÉES 70 — RENFORTS DÉBUTANT
  // ══════════════════════════════════════════════════════
  { id:196, title:"Roxanne",                  artist:"The Police",           year:1978, genre:'rock',   decade:'1970s', difficulty:1, deezerQuery:"The Police Roxanne" },
  { id:197, title:"Message in a Bottle",      artist:"The Police",           year:1979, genre:'rock',   decade:'1970s', difficulty:2, deezerQuery:"The Police Message in a Bottle" },
  { id:198, title:"Sultans of Swing",         artist:"Dire Straits",         year:1978, genre:'rock',   decade:'1970s', difficulty:2, deezerQuery:"Dire Straits Sultans of Swing" },
  { id:199, title:"Go Your Own Way",          artist:"Fleetwood Mac",        year:1977, genre:'rock',   decade:'1970s', difficulty:2, deezerQuery:"Fleetwood Mac Go Your Own Way" },
  { id:200, title:"Dreams",                   artist:"Fleetwood Mac",        year:1977, genre:'rock',   decade:'1970s', difficulty:1, deezerQuery:"Fleetwood Mac Dreams" },
  { id:201, title:"Baker Street",             artist:"Gerry Rafferty",       year:1978, genre:'rock',   decade:'1970s', difficulty:2, deezerQuery:"Gerry Rafferty Baker Street" },
  { id:202, title:"More Than a Feeling",      artist:"Boston",               year:1976, genre:'rock',   decade:'1970s', difficulty:2, deezerQuery:"Boston More Than a Feeling" },
  { id:203, title:"Free Bird",                artist:"Lynyrd Skynyrd",       year:1973, genre:'rock',   decade:'1970s', difficulty:2, deezerQuery:"Lynyrd Skynyrd Free Bird" },

  // ══════════════════════════════════════════════════════
  // ANNÉES 80 — RENFORTS DÉBUTANT
  // ══════════════════════════════════════════════════════
  { id:204, title:"Take On Me",               artist:"a-ha",                 year:1985, genre:'pop',    decade:'1980s', difficulty:1, deezerQuery:"a-ha Take On Me" },
  { id:205, title:"99 Luftballons",           artist:"Nena",                 year:1983, genre:'pop',    decade:'1980s', difficulty:1, deezerQuery:"Nena 99 Luftballons" },
  { id:206, title:"Vienna",                   artist:"Ultravox",             year:1980, genre:'pop',    decade:'1980s', difficulty:2, deezerQuery:"Ultravox Vienna" },
  { id:207, title:"Every Breath You Take",    artist:"The Police",           year:1983, genre:'pop',    decade:'1980s', difficulty:1, deezerQuery:"The Police Every Breath You Take" },
  { id:208, title:"True",                     artist:"Spandau Ballet",       year:1983, genre:'pop',    decade:'1980s', difficulty:2, deezerQuery:"Spandau Ballet True" },
  { id:209, title:"Don't Stop Believin'",     artist:"Journey",              year:1981, genre:'rock',   decade:'1980s', difficulty:1, deezerQuery:"Journey Don't Stop Believin" },
  { id:210, title:"Footloose",                artist:"Kenny Loggins",        year:1984, genre:'pop',    decade:'1980s', difficulty:1, deezerQuery:"Kenny Loggins Footloose" },
  { id:211, title:"Walking on Sunshine",      artist:"Katrina and the Waves",year:1985, genre:'pop',    decade:'1980s', difficulty:1, deezerQuery:"Katrina Waves Walking on Sunshine" },
  { id:212, title:"Summer of '69",            artist:"Bryan Adams",          year:1985, genre:'rock',   decade:'1980s', difficulty:1, deezerQuery:"Bryan Adams Summer of 69" },
  { id:213, title:"I Want to Know What Love Is","artist":"Foreigner",        year:1984, genre:'rock',   decade:'1980s', difficulty:2, deezerQuery:"Foreigner I Want to Know What Love Is" },
  { id:214, title:"La Isla Bonita",           artist:"Madonna",              year:1987, genre:'pop',    decade:'1980s', difficulty:1, deezerQuery:"Madonna La Isla Bonita" },
  { id:215, title:"With or Without You",      artist:"U2",                   year:1987, genre:'rock',   decade:'1980s', difficulty:1, deezerQuery:"U2 With or Without You" },
  { id:216, title:"Sunday Bloody Sunday",     artist:"U2",                   year:1983, genre:'rock',   decade:'1980s', difficulty:2, deezerQuery:"U2 Sunday Bloody Sunday" },

  // ══════════════════════════════════════════════════════
  // ANNÉES 90 — RENFORTS DÉBUTANT
  // ══════════════════════════════════════════════════════
  { id:217, title:"Everybody (Backstreet's Back)","artist":"Backstreet Boys",year:1997,genre:'pop',    decade:'1990s', difficulty:1, deezerQuery:"Backstreet Boys Everybody" },
  { id:218, title:"I Want It That Way",       artist:"Backstreet Boys",      year:1999, genre:'pop',    decade:'1990s', difficulty:1, deezerQuery:"Backstreet Boys I Want It That Way" },
  { id:219, title:"Quit Playing Games",       artist:"Backstreet Boys",      year:1996, genre:'pop',    decade:'1990s', difficulty:2, deezerQuery:"Backstreet Boys Quit Playing Games" },
  { id:220, title:"Tearin' Up My Heart",      artist:"*NSYNC",               year:1997, genre:'pop',    decade:'1990s', difficulty:2, deezerQuery:"NSYNC Tearin Up My Heart" },
  { id:221, title:"Mysterious Girl",          artist:"Peter Andre",          year:1996, genre:'pop',    decade:'1990s', difficulty:1, deezerQuery:"Peter Andre Mysterious Girl" },
  { id:222, title:"No Scrubs",                artist:"TLC",                  year:1999, genre:'rnb',    decade:'1990s', difficulty:1, deezerQuery:"TLC No Scrubs" },
  { id:223, title:"Waterfalls",               artist:"TLC",                  year:1994, genre:'rnb',    decade:'1990s', difficulty:2, deezerQuery:"TLC Waterfalls" },
  { id:224, title:"Kiss from a Rose",         artist:"Seal",                 year:1994, genre:'pop',    decade:'1990s', difficulty:2, deezerQuery:"Seal Kiss from a Rose" },
  { id:225, title:"Ironic",                   artist:"Alanis Morissette",    year:1995, genre:'rock',   decade:'1990s', difficulty:1, deezerQuery:"Alanis Morissette Ironic" },
  { id:226, title:"You Oughta Know",          artist:"Alanis Morissette",    year:1995, genre:'rock',   decade:'1990s', difficulty:2, deezerQuery:"Alanis Morissette You Oughta Know" },
  { id:227, title:"Gangsta's Paradise",       artist:"Coolio",               year:1995, genre:'hiphop', decade:'1990s', difficulty:1, deezerQuery:"Coolio Gangsta's Paradise" },
  { id:228, title:"Jump Around",              artist:"House of Pain",        year:1992, genre:'hiphop', decade:'1990s', difficulty:2, deezerQuery:"House of Pain Jump Around" },

  // ══════════════════════════════════════════════════════
  // ANNÉES 2000 — RENFORTS DÉBUTANT
  // ══════════════════════════════════════════════════════
  { id:229, title:"Crazy in Love",            artist:"Beyoncé",              year:2003, genre:'rnb',    decade:'2000s', difficulty:1, deezerQuery:"Beyoncé Crazy in Love" },
  { id:230, title:"Single Ladies",            artist:"Beyoncé",              year:2008, genre:'rnb',    decade:'2000s', difficulty:1, deezerQuery:"Beyoncé Single Ladies" },
  { id:231, title:"Beautiful Day",            artist:"U2",                   year:2000, genre:'rock',   decade:'2000s', difficulty:1, deezerQuery:"U2 Beautiful Day" },
  { id:232, title:"Mr. Brightside",           artist:"The Killers",          year:2003, genre:'rock',   decade:'2000s', difficulty:1, deezerQuery:"The Killers Mr Brightside" },
  { id:233, title:"Since U Been Gone",        artist:"Kelly Clarkson",       year:2004, genre:'pop',    decade:'2000s', difficulty:1, deezerQuery:"Kelly Clarkson Since U Been Gone" },
  { id:234, title:"Hips Don't Lie",           artist:"Shakira",              year:2005, genre:'pop',    decade:'2000s', difficulty:1, deezerQuery:"Shakira Hips Don't Lie" },
  { id:235, title:"Beautiful",               artist:"Christina Aguilera",   year:2002, genre:'pop',    decade:'2000s', difficulty:1, deezerQuery:"Christina Aguilera Beautiful" },
  { id:236, title:"Complicated",             artist:"Avril Lavigne",        year:2002, genre:'pop',    decade:'2000s', difficulty:1, deezerQuery:"Avril Lavigne Complicated" },
  { id:237, title:"Sk8er Boi",               artist:"Avril Lavigne",        year:2002, genre:'rock',   decade:'2000s', difficulty:1, deezerQuery:"Avril Lavigne Sk8er Boi" },
  { id:238, title:"Viva la Vida",             artist:"Coldplay",             year:2008, genre:'rock',   decade:'2000s', difficulty:1, deezerQuery:"Coldplay Viva la Vida" },
  { id:239, title:"The Scientist",            artist:"Coldplay",             year:2002, genre:'rock',   decade:'2000s', difficulty:2, deezerQuery:"Coldplay The Scientist" },
  { id:240, title:"Boulevard of Broken Dreams","artist":"Green Day",         year:2004, genre:'rock',   decade:'2000s', difficulty:1, deezerQuery:"Green Day Boulevard of Broken Dreams" },
  { id:241, title:"American Idiot",           artist:"Green Day",            year:2004, genre:'rock',   decade:'2000s', difficulty:1, deezerQuery:"Green Day American Idiot" },
  { id:242, title:"Hey Ya!",                  artist:"OutKast",              year:2003, genre:'hiphop', decade:'2000s', difficulty:1, deezerQuery:"OutKast Hey Ya" },
  { id:243, title:"Umbrella",                 artist:"Rihanna",              year:2007, genre:'pop',    decade:'2000s', difficulty:1, deezerQuery:"Rihanna Umbrella" },
  { id:244, title:"Rehab",                    artist:"Amy Winehouse",        year:2006, genre:'soul',   decade:'2000s', difficulty:2, deezerQuery:"Amy Winehouse Rehab" },
  { id:245, title:"Valerie",                  artist:"Amy Winehouse",        year:2006, genre:'soul',   decade:'2000s', difficulty:2, deezerQuery:"Amy Winehouse Valerie" },

  // ══════════════════════════════════════════════════════
  // ANNÉES 2010 — RENFORTS DÉBUTANT
  // ══════════════════════════════════════════════════════
  { id:246, title:"Somebody That I Used to Know","artist":"Gotye",          year:2011, genre:'pop',    decade:'2010s', difficulty:1, deezerQuery:"Gotye Somebody That I Used to Know" },
  { id:247, title:"Royals",                   artist:"Lorde",               year:2013, genre:'pop',    decade:'2010s', difficulty:1, deezerQuery:"Lorde Royals" },
  { id:248, title:"Radioactive",              artist:"Imagine Dragons",     year:2012, genre:'rock',   decade:'2010s', difficulty:1, deezerQuery:"Imagine Dragons Radioactive" },
  { id:249, title:"Demons",                   artist:"Imagine Dragons",     year:2012, genre:'rock',   decade:'2010s', difficulty:2, deezerQuery:"Imagine Dragons Demons" },
  { id:250, title:"Counting Stars",           artist:"OneRepublic",         year:2013, genre:'pop',    decade:'2010s', difficulty:1, deezerQuery:"OneRepublic Counting Stars" },
  { id:251, title:"Cheap Thrills",            artist:"Sia",                 year:2016, genre:'pop',    decade:'2010s', difficulty:1, deezerQuery:"Sia Cheap Thrills" },
  { id:252, title:"Chandelier",               artist:"Sia",                 year:2014, genre:'pop',    decade:'2010s', difficulty:2, deezerQuery:"Sia Chandelier" },
  { id:253, title:"Stressed Out",             artist:"Twenty One Pilots",   year:2015, genre:'pop',    decade:'2010s', difficulty:1, deezerQuery:"Twenty One Pilots Stressed Out" },
  { id:254, title:"Closer",                   artist:"The Chainsmokers",    year:2016, genre:'electronic',decade:'2010s',difficulty:1, deezerQuery:"The Chainsmokers Closer" },
  { id:255, title:"Something Just Like This", artist:"The Chainsmokers",    year:2017, genre:'electronic',decade:'2010s',difficulty:1, deezerQuery:"Chainsmokers Coldplay Something Just Like This" },
  { id:256, title:"Lean On",                  artist:"Major Lazer",         year:2015, genre:'electronic',decade:'2010s',difficulty:1, deezerQuery:"Major Lazer Lean On" },
  { id:257, title:"Stay With Me",             artist:"Sam Smith",           year:2014, genre:'pop',    decade:'2010s', difficulty:1, deezerQuery:"Sam Smith Stay With Me" },
  { id:258, title:"Too Good at Goodbyes",     artist:"Sam Smith",           year:2017, genre:'pop',    decade:'2010s', difficulty:2, deezerQuery:"Sam Smith Too Good at Goodbyes" },
  { id:259, title:"Perfect",                  artist:"Ed Sheeran",          year:2017, genre:'pop',    decade:'2010s', difficulty:1, deezerQuery:"Ed Sheeran Perfect" },
  { id:260, title:"Love Yourself",            artist:"Justin Bieber",       year:2015, genre:'pop',    decade:'2010s', difficulty:1, deezerQuery:"Justin Bieber Love Yourself" },

  // ══════════════════════════════════════════════════════
  // ANNÉES 2020 — RENFORTS DÉBUTANT
  // ══════════════════════════════════════════════════════
  { id:261, title:"Levitating",               artist:"Dua Lipa",            year:2020, genre:'pop',    decade:'2020s', difficulty:1, deezerQuery:"Dua Lipa Levitating" },
  { id:262, title:"Don't Start Now",          artist:"Dua Lipa",            year:2019, genre:'pop',    decade:'2020s', difficulty:1, deezerQuery:"Dua Lipa Don't Start Now" },
  { id:263, title:"drivers license",          artist:"Olivia Rodrigo",      year:2021, genre:'pop',    decade:'2020s', difficulty:1, deezerQuery:"Olivia Rodrigo drivers license" },
  { id:264, title:"good 4 u",                 artist:"Olivia Rodrigo",      year:2021, genre:'pop',    decade:'2020s', difficulty:1, deezerQuery:"Olivia Rodrigo good 4 u" },
  { id:265, title:"Stay",                     artist:"The Kid LAROI",       year:2021, genre:'pop',    decade:'2020s', difficulty:1, deezerQuery:"The Kid LAROI Stay" },
  { id:266, title:"Easy On Me",               artist:"Adele",               year:2021, genre:'pop',    decade:'2020s', difficulty:1, deezerQuery:"Adele Easy On Me" },
  { id:267, title:"Heat Waves",               artist:"Glass Animals",       year:2020, genre:'pop',    decade:'2020s', difficulty:2, deezerQuery:"Glass Animals Heat Waves" },
  { id:268, title:"Montero",                  artist:"Lil Nas X",           year:2021, genre:'hiphop', decade:'2020s', difficulty:1, deezerQuery:"Lil Nas X Montero" },
  { id:269, title:"Running Up That Hill",     artist:"Kate Bush",           year:2022, genre:'pop',    decade:'2020s', difficulty:1, deezerQuery:"Kate Bush Running Up That Hill" },
  { id:270, title:"Unholy",                   artist:"Sam Smith",           year:2022, genre:'pop',    decade:'2020s', difficulty:1, deezerQuery:"Sam Smith Unholy" },
  { id:271, title:"Escapism",                 artist:"RAYE",                year:2022, genre:'rnb',    decade:'2020s', difficulty:2, deezerQuery:"RAYE Escapism" },
  { id:272, title:"Vampire",                  artist:"Olivia Rodrigo",      year:2023, genre:'pop',    decade:'2020s', difficulty:1, deezerQuery:"Olivia Rodrigo Vampire" },
  { id:273, title:"Cruel Summer",             artist:"Taylor Swift",        year:2023, genre:'pop',    decade:'2020s', difficulty:1, deezerQuery:"Taylor Swift Cruel Summer" },
  { id:274, title:"Kill Bill",                artist:"SZA",                 year:2022, genre:'rnb',    decade:'2020s', difficulty:2, deezerQuery:"SZA Kill Bill" },
  { id:275, title:"Calm Down",                artist:"Rema",                year:2022, genre:'pop',    decade:'2020s', difficulty:2, deezerQuery:"Rema Calm Down" },

  // ══════════════════════════════════════════════════════
  // MUSIQUE CLASSIQUE — BAROQUE (1600–1750)
  // ══════════════════════════════════════════════════════
  { id:276, title:"Le Printemps (Les Quatre Saisons)", artist:"Antonio Vivaldi", year:1725, genre:'classique', decade:'1940s', difficulty:1, deezerQuery:"Vivaldi Four Seasons Spring" },
  { id:277, title:"L'Hiver (Les Quatre Saisons)",      artist:"Antonio Vivaldi", year:1725, genre:'classique', decade:'1940s', difficulty:1, deezerQuery:"Vivaldi Four Seasons Winter" },
  { id:278, title:"L'Été (Les Quatre Saisons)",        artist:"Antonio Vivaldi", year:1725, genre:'classique', decade:'1940s', difficulty:2, deezerQuery:"Vivaldi Four Seasons Summer" },
  { id:279, title:"L'Automne (Les Quatre Saisons)",    artist:"Antonio Vivaldi", year:1725, genre:'classique', decade:'1940s', difficulty:2, deezerQuery:"Vivaldi Four Seasons Autumn" },
  { id:280, title:"Toccata et Fugue en ré mineur",     artist:"Jean-Sébastien Bach", year:1703, genre:'classique', decade:'1940s', difficulty:1, deezerQuery:"Bach Toccata Fugue D minor" },
  { id:281, title:"Air sur la corde de Sol",           artist:"Jean-Sébastien Bach", year:1717, genre:'classique', decade:'1940s', difficulty:1, deezerQuery:"Bach Air on G String" },
  { id:282, title:"Prélude en do majeur (Clavecin)",   artist:"Jean-Sébastien Bach", year:1722, genre:'classique', decade:'1940s', difficulty:2, deezerQuery:"Bach Prelude C major Well Tempered Clavier" },
  { id:283, title:"Brandebourgeois No. 3",             artist:"Jean-Sébastien Bach", year:1721, genre:'classique', decade:'1940s', difficulty:3, deezerQuery:"Bach Brandenburg Concerto No 3" },
  { id:284, title:"Suite pour violoncelle No. 1 — Prélude", artist:"Jean-Sébastien Bach", year:1720, genre:'classique', decade:'1940s', difficulty:2, deezerQuery:"Bach Cello Suite No 1 Prelude" },
  { id:285, title:"Canon en Ré",                       artist:"Johann Pachelbel",    year:1680, genre:'classique', decade:'1940s', difficulty:1, deezerQuery:"Pachelbel Canon in D" },
  { id:286, title:"Hallelujah (Messie)",                artist:"Georg Haendel",       year:1741, genre:'classique', decade:'1940s', difficulty:1, deezerQuery:"Handel Messiah Hallelujah" },
  { id:287, title:"Water Music — Allegro",              artist:"Georg Haendel",       year:1717, genre:'classique', decade:'1940s', difficulty:2, deezerQuery:"Handel Water Music" },
  { id:288, title:"Adagio en Sol mineur",               artist:"Tomaso Albinoni",     year:1708, genre:'classique', decade:'1940s', difficulty:2, deezerQuery:"Albinoni Adagio G minor" },
  { id:289, title:"La Primavera (Vivaldi)",             artist:"Antonio Vivaldi",     year:1725, genre:'classique', decade:'1940s', difficulty:2, deezerQuery:"Vivaldi Primavera violin" },

  // ══════════════════════════════════════════════════════
  // MUSIQUE CLASSIQUE — ÈRE CLASSIQUE (1750–1820)
  // ══════════════════════════════════════════════════════
  { id:290, title:"Petite Musique de Nuit",            artist:"Wolfgang A. Mozart",  year:1787, genre:'classique', decade:'1950s', difficulty:1, deezerQuery:"Mozart Eine Kleine Nachtmusik" },
  { id:291, title:"Marche Turque",                     artist:"Wolfgang A. Mozart",  year:1783, genre:'classique', decade:'1950s', difficulty:1, deezerQuery:"Mozart Turkish March Rondo alla Turca" },
  { id:292, title:"Symphonie No. 40 en Sol mineur",    artist:"Wolfgang A. Mozart",  year:1788, genre:'classique', decade:'1950s', difficulty:2, deezerQuery:"Mozart Symphony 40 G minor" },
  { id:293, title:"Lacrimosa (Requiem)",                artist:"Wolfgang A. Mozart",  year:1791, genre:'classique', decade:'1950s', difficulty:1, deezerQuery:"Mozart Lacrimosa Requiem" },
  { id:294, title:"Concerto pour piano No. 21",        artist:"Wolfgang A. Mozart",  year:1785, genre:'classique', decade:'1950s', difficulty:2, deezerQuery:"Mozart Piano Concerto 21 Elvira Madigan" },
  { id:295, title:"Ouverture de La Flûte Enchantée",   artist:"Wolfgang A. Mozart",  year:1791, genre:'classique', decade:'1950s', difficulty:3, deezerQuery:"Mozart Magic Flute Overture" },
  { id:296, title:"Don Giovanni — Ouverture",           artist:"Wolfgang A. Mozart",  year:1787, genre:'classique', decade:'1950s', difficulty:3, deezerQuery:"Mozart Don Giovanni Overture" },
  { id:297, title:"Symphonie No. 5 — Destin",          artist:"Ludwig van Beethoven", year:1808, genre:'classique', decade:'1950s', difficulty:1, deezerQuery:"Beethoven Symphony No 5" },
  { id:298, title:"Sonate au Clair de Lune",           artist:"Ludwig van Beethoven", year:1801, genre:'classique', decade:'1950s', difficulty:1, deezerQuery:"Beethoven Moonlight Sonata" },
  { id:299, title:"Pour Élise",                        artist:"Ludwig van Beethoven", year:1810, genre:'classique', decade:'1950s', difficulty:1, deezerQuery:"Beethoven Fur Elise" },
  { id:300, title:"Ode à la Joie (Symphonie No. 9)",   artist:"Ludwig van Beethoven", year:1824, genre:'classique', decade:'1950s', difficulty:1, deezerQuery:"Beethoven Ode to Joy Symphony 9" },
  { id:301, title:"Symphonie No. 6 Pastorale",         artist:"Ludwig van Beethoven", year:1808, genre:'classique', decade:'1950s', difficulty:2, deezerQuery:"Beethoven Pastoral Symphony 6" },
  { id:302, title:"Sonate Pathétique",                 artist:"Ludwig van Beethoven", year:1799, genre:'classique', decade:'1950s', difficulty:2, deezerQuery:"Beethoven Pathetique Sonata" },
  { id:303, title:"Concerto pour piano No. 5 Empereur", artist:"Ludwig van Beethoven",year:1811, genre:'classique', decade:'1950s', difficulty:3, deezerQuery:"Beethoven Emperor Piano Concerto 5" },
  { id:304, title:"Symphonie des Surprises",           artist:"Joseph Haydn",        year:1792, genre:'classique', decade:'1950s', difficulty:3, deezerQuery:"Haydn Surprise Symphony 94" },

  // ══════════════════════════════════════════════════════
  // MUSIQUE CLASSIQUE — ROMANTISME (1820–1900)
  // ══════════════════════════════════════════════════════
  { id:305, title:"Nocturne No. 2 en Mi bémol",        artist:"Frédéric Chopin",     year:1832, genre:'classique', decade:'1960s', difficulty:1, deezerQuery:"Chopin Nocturne Op 9 No 2" },
  { id:306, title:"Ballade No. 1 en Sol mineur",       artist:"Frédéric Chopin",     year:1835, genre:'classique', decade:'1960s', difficulty:3, deezerQuery:"Chopin Ballade No 1 G minor" },
  { id:307, title:"Étude Révolutionnaire Op. 10 No. 12","artist":"Frédéric Chopin",  year:1831, genre:'classique', decade:'1960s', difficulty:3, deezerQuery:"Chopin Etude Revolutionary Op 10 No 12" },
  { id:308, title:"Valse en La bémol (Grand Valse)",   artist:"Frédéric Chopin",     year:1835, genre:'classique', decade:'1960s', difficulty:2, deezerQuery:"Chopin Grande Valse Brillante Op 18" },
  { id:309, title:"Polonaise Héroïque",                artist:"Frédéric Chopin",     year:1842, genre:'classique', decade:'1960s', difficulty:2, deezerQuery:"Chopin Polonaise Heroique Op 53" },
  { id:310, title:"Prélude en Ré mineur (La Goutte d'eau)","artist":"Frédéric Chopin",year:1839, genre:'classique', decade:'1960s', difficulty:2, deezerQuery:"Chopin Prelude Raindrop Op 28 No 15" },
  { id:311, title:"Ave Maria",                         artist:"Franz Schubert",      year:1825, genre:'classique', decade:'1960s', difficulty:1, deezerQuery:"Schubert Ave Maria" },
  { id:312, title:"Symphonie No. 8 Inachevée",         artist:"Franz Schubert",      year:1822, genre:'classique', decade:'1960s', difficulty:2, deezerQuery:"Schubert Unfinished Symphony 8" },
  { id:313, title:"Rhapsodie Hongroise No. 2",         artist:"Franz Liszt",         year:1847, genre:'classique', decade:'1960s', difficulty:2, deezerQuery:"Liszt Hungarian Rhapsody No 2" },
  { id:314, title:"Le Lac des Cygnes",                 artist:"Piotr Tchaïkovski",   year:1876, genre:'classique', decade:'1960s', difficulty:1, deezerQuery:"Tchaikovsky Swan Lake Theme" },
  { id:315, title:"Casse-Noisette — Danse de la Fée",  artist:"Piotr Tchaïkovski",   year:1892, genre:'classique', decade:'1960s', difficulty:1, deezerQuery:"Tchaikovsky Nutcracker Suite Sugar Plum" },
  { id:316, title:"Ouverture 1812",                    artist:"Piotr Tchaïkovski",   year:1882, genre:'classique', decade:'1960s', difficulty:1, deezerQuery:"Tchaikovsky 1812 Overture" },
  { id:317, title:"Concerto pour piano No. 1 en Si bémol","artist":"Piotr Tchaïkovski",year:1875,genre:'classique', decade:'1960s', difficulty:2, deezerQuery:"Tchaikovsky Piano Concerto No 1" },
  { id:318, title:"Symphonie No. 6 Pathétique",        artist:"Piotr Tchaïkovski",   year:1893, genre:'classique', decade:'1960s', difficulty:3, deezerQuery:"Tchaikovsky Pathetique Symphony 6" },
  { id:319, title:"Symphonie du Nouveau Monde",        artist:"Antonín Dvořák",      year:1893, genre:'classique', decade:'1960s', difficulty:1, deezerQuery:"Dvorak New World Symphony 9" },
  { id:320, title:"Dans le Hall du Roi de la Montagne","artist":"Edvard Grieg",      year:1875, genre:'classique', decade:'1960s', difficulty:1, deezerQuery:"Grieg In the Hall of the Mountain King" },
  { id:321, title:"Peer Gynt — Matin",                 artist:"Edvard Grieg",        year:1875, genre:'classique', decade:'1960s', difficulty:2, deezerQuery:"Grieg Morning Peer Gynt" },
  { id:322, title:"La Chevauchée des Walkyries",       artist:"Richard Wagner",      year:1870, genre:'classique', decade:'1960s', difficulty:1, deezerQuery:"Wagner Ride of the Valkyries" },
  { id:323, title:"O Mio Babbino Caro (Puccini)",      artist:"Giacomo Puccini",     year:1918, genre:'classique', decade:'1960s', difficulty:1, deezerQuery:"Puccini O Mio Babbino Caro" },
  { id:324, title:"Nessun Dorma (Turandot)",           artist:"Giacomo Puccini",     year:1926, genre:'classique', decade:'1960s', difficulty:1, deezerQuery:"Puccini Nessun Dorma Turandot" },
  { id:325, title:"La Traviata — Brindisi",            artist:"Giuseppe Verdi",      year:1853, genre:'classique', decade:'1960s', difficulty:2, deezerQuery:"Verdi La Traviata Brindisi" },
  { id:326, title:"Aïda — Marche Triomphale",          artist:"Giuseppe Verdi",      year:1871, genre:'classique', decade:'1960s', difficulty:2, deezerQuery:"Verdi Aida Triumphal March" },
  { id:327, title:"Symphonie No. 3 Eroïca",            artist:"Ludwig van Beethoven", year:1805, genre:'classique', decade:'1960s', difficulty:3, deezerQuery:"Beethoven Eroica Symphony 3" },
  { id:328, title:"Symphonie No. 1",                   artist:"Johannes Brahms",     year:1876, genre:'classique', decade:'1960s', difficulty:3, deezerQuery:"Brahms Symphony No 1" },
  { id:329, title:"Danse Macabre",                     artist:"Camille Saint-Saëns", year:1874, genre:'classique', decade:'1960s', difficulty:2, deezerQuery:"Saint-Saens Danse Macabre" },
  { id:330, title:"Le Carnaval des Animaux — Le Cygne","artist":"Camille Saint-Saëns",year:1886,genre:'classique', decade:'1960s', difficulty:1, deezerQuery:"Saint-Saens Carnival Animals Swan" },
  { id:331, title:"Schéhérazade Op. 35",               artist:"Nikolaï Rimski-Korsakov",year:1888,genre:'classique',decade:'1960s',difficulty:3,deezerQuery:"Rimsky-Korsakov Scheherazade" },

  // ══════════════════════════════════════════════════════
  // MUSIQUE CLASSIQUE — MODERNE (1900–1950)
  // ══════════════════════════════════════════════════════
  { id:332, title:"Clair de Lune",                     artist:"Claude Debussy",      year:1905, genre:'classique', decade:'1970s', difficulty:1, deezerQuery:"Debussy Clair de Lune" },
  { id:333, title:"La Mer",                            artist:"Claude Debussy",      year:1905, genre:'classique', decade:'1970s', difficulty:2, deezerQuery:"Debussy La Mer" },
  { id:334, title:"Arabesque No. 1",                   artist:"Claude Debussy",      year:1891, genre:'classique', decade:'1970s', difficulty:2, deezerQuery:"Debussy Arabesque No 1" },
  { id:335, title:"Boléro",                            artist:"Maurice Ravel",       year:1928, genre:'classique', decade:'1970s', difficulty:1, deezerQuery:"Ravel Bolero" },
  { id:336, title:"Pavane pour une Infante Défunte",   artist:"Maurice Ravel",       year:1899, genre:'classique', decade:'1970s', difficulty:1, deezerQuery:"Ravel Pavane Infante Defunte" },
  { id:337, title:"Gymnopédie No. 1",                  artist:"Erik Satie",          year:1888, genre:'classique', decade:'1970s', difficulty:1, deezerQuery:"Satie Gymnopedie No 1" },
  { id:338, title:"Gnossienne No. 1",                  artist:"Erik Satie",          year:1890, genre:'classique', decade:'1970s', difficulty:2, deezerQuery:"Satie Gnossienne No 1" },
  { id:339, title:"Le Sacre du Printemps",             artist:"Igor Stravinsky",     year:1913, genre:'classique', decade:'1970s', difficulty:3, deezerQuery:"Stravinsky Rite of Spring" },
  { id:340, title:"L'Oiseau de Feu",                   artist:"Igor Stravinsky",     year:1910, genre:'classique', decade:'1970s', difficulty:3, deezerQuery:"Stravinsky Firebird Suite" },
  { id:341, title:"Rhapsodie in Blue",                 artist:"George Gershwin",     year:1924, genre:'classique', decade:'1970s', difficulty:1, deezerQuery:"Gershwin Rhapsody in Blue" },
  { id:342, title:"Summertime (Porgy and Bess)",       artist:"George Gershwin",     year:1935, genre:'classique', decade:'1970s', difficulty:1, deezerQuery:"Gershwin Summertime Porgy Bess" },
  { id:343, title:"Symphonie No. 5",                   artist:"Gustav Mahler",       year:1902, genre:'classique', decade:'1970s', difficulty:3, deezerQuery:"Mahler Symphony No 5 Adagietto" },
  { id:344, title:"Also Sprach Zarathustra",           artist:"Richard Strauss",     year:1896, genre:'classique', decade:'1970s', difficulty:1, deezerQuery:"Strauss Also Sprach Zarathustra" },
  { id:345, title:"Concerto pour violon",              artist:"Samuel Barber",       year:1939, genre:'classique', decade:'1970s', difficulty:3, deezerQuery:"Barber Violin Concerto" },
  { id:346, title:"Adagio pour cordes",                artist:"Samuel Barber",       year:1936, genre:'classique', decade:'1970s', difficulty:2, deezerQuery:"Barber Adagio for Strings" },
  { id:347, title:"Carmina Burana — O Fortuna",        artist:"Carl Orff",           year:1937, genre:'classique', decade:'1970s', difficulty:1, deezerQuery:"Orff Carmina Burana O Fortuna" },
  { id:348, title:"Peer Gynt — Suite",                 artist:"Edvard Grieg",        year:1876, genre:'classique', decade:'1970s', difficulty:2, deezerQuery:"Grieg Peer Gynt Suite" },

  // ══════════════════════════════════════════════════════
  // BLUES — DOMAINE PUBLIC (pré-1928)
  // ══════════════════════════════════════════════════════
  { id:349, title:"St. Louis Blues",              artist:"W.C. Handy",           year:1914, genre:'blues', decade:'1940s', difficulty:2, deezerQuery:"WC Handy St Louis Blues" },
  { id:350, title:"Beale Street Blues",           artist:"W.C. Handy",           year:1916, genre:'blues', decade:'1940s', difficulty:3, deezerQuery:"WC Handy Beale Street Blues" },
  { id:351, title:"Memphis Blues",                artist:"W.C. Handy",           year:1912, genre:'blues', decade:'1940s', difficulty:3, deezerQuery:"WC Handy Memphis Blues" },
  { id:352, title:"Nobody Knows You When You're Down and Out","artist":"Bessie Smith",year:1923,genre:'blues',decade:'1940s',difficulty:2, deezerQuery:"Bessie Smith Nobody Knows You Down and Out" },
  { id:353, title:"Downhearted Blues",            artist:"Bessie Smith",          year:1923, genre:'blues', decade:'1940s', difficulty:3, deezerQuery:"Bessie Smith Downhearted Blues" },
  { id:354, title:"Sweet Home Chicago",           artist:"Robert Johnson",        year:1936, genre:'blues', decade:'1940s', difficulty:2, deezerQuery:"Robert Johnson Sweet Home Chicago" },
  { id:355, title:"Cross Road Blues",             artist:"Robert Johnson",        year:1936, genre:'blues', decade:'1940s', difficulty:3, deezerQuery:"Robert Johnson Cross Road Blues" },
  { id:356, title:"Heebie Jeebies",               artist:"Louis Armstrong",       year:1926, genre:'blues', decade:'1940s', difficulty:3, deezerQuery:"Louis Armstrong Heebie Jeebies 1926" },
  { id:357, title:"See See Rider Blues",          artist:"Ma Rainey",            year:1924, genre:'blues', decade:'1940s', difficulty:3, deezerQuery:"Ma Rainey See See Rider" },
  { id:358, title:"Trouble in Mind",              artist:"Richard M. Jones",      year:1924, genre:'blues', decade:'1940s', difficulty:3, deezerQuery:"Richard Jones Trouble in Mind blues" },
  { id:359, title:"Key to the Highway",           artist:"Big Bill Broonzy",      year:1941, genre:'blues', decade:'1940s', difficulty:3, deezerQuery:"Big Bill Broonzy Key to the Highway" },
  { id:360, title:"Rollin' and Tumblin'",         artist:"Muddy Waters",          year:1950, genre:'blues', decade:'1950s', difficulty:3, deezerQuery:"Muddy Waters Rollin and Tumblin" },
  { id:361, title:"Hoochie Coochie Man",          artist:"Muddy Waters",          year:1954, genre:'blues', decade:'1950s', difficulty:2, deezerQuery:"Muddy Waters Hoochie Coochie Man" },
  { id:362, title:"The Thrill Is Gone",           artist:"B.B. King",             year:1969, genre:'blues', decade:'1960s', difficulty:1, deezerQuery:"BB King The Thrill Is Gone" },
  { id:363, title:"Every Day I Have the Blues",   artist:"B.B. King",             year:1955, genre:'blues', decade:'1950s', difficulty:2, deezerQuery:"BB King Every Day I Have the Blues" },
  { id:364, title:"Boom Boom",                    artist:"John Lee Hooker",       year:1961, genre:'blues', decade:'1960s', difficulty:2, deezerQuery:"John Lee Hooker Boom Boom" },
  { id:365, title:"Mannish Boy",                  artist:"Muddy Waters",          year:1955, genre:'blues', decade:'1950s', difficulty:2, deezerQuery:"Muddy Waters Mannish Boy" },
  { id:366, title:"Stormy Monday",                artist:"T-Bone Walker",         year:1947, genre:'blues', decade:'1940s', difficulty:3, deezerQuery:"T-Bone Walker Stormy Monday" },

  // ══════════════════════════════════════════════════════
  // GOSPEL & SPIRITUALS — DOMAINE PUBLIC
  // ══════════════════════════════════════════════════════
  { id:367, title:"Oh Happy Day",                 artist:"Edwin Hawkins Singers", year:1967, genre:'gospel', decade:'1960s', difficulty:1, deezerQuery:"Edwin Hawkins Oh Happy Day" },
  { id:368, title:"Amazing Grace",                artist:"Traditional",           year:1779, genre:'gospel', decade:'1940s', difficulty:1, deezerQuery:"Amazing Grace traditional" },
  { id:369, title:"Go Down Moses",                artist:"Traditional",           year:1865, genre:'gospel', decade:'1940s', difficulty:2, deezerQuery:"Go Down Moses spiritual" },
  { id:370, title:"Swing Low Sweet Chariot",      artist:"Traditional",           year:1847, genre:'gospel', decade:'1940s', difficulty:1, deezerQuery:"Swing Low Sweet Chariot spiritual" },
  { id:371, title:"Nobody Knows the Trouble I've Seen","artist":"Traditional",   year:1867, genre:'gospel', decade:'1940s', difficulty:2, deezerQuery:"Nobody Knows the Trouble spiritual" },
  { id:372, title:"Deep River",                   artist:"Traditional",           year:1875, genre:'gospel', decade:'1940s', difficulty:2, deezerQuery:"Deep River spiritual negro" },
  { id:373, title:"This Little Light of Mine",    artist:"Traditional",           year:1920, genre:'gospel', decade:'1940s', difficulty:1, deezerQuery:"This Little Light of Mine gospel" },
  { id:374, title:"When the Saints Go Marching In","artist":"Traditional",        year:1896, genre:'gospel', decade:'1940s', difficulty:1, deezerQuery:"When the Saints Go Marching In" },
  { id:375, title:"He's Got the Whole World",     artist:"Traditional",           year:1927, genre:'gospel', decade:'1940s', difficulty:1, deezerQuery:"He's Got the Whole World in His Hands" },
  { id:376, title:"Precious Lord Take My Hand",   artist:"Thomas A. Dorsey",      year:1932, genre:'gospel', decade:'1940s', difficulty:2, deezerQuery:"Precious Lord Take My Hand gospel" },
  { id:377, title:"Abide With Me",                artist:"Henry Francis Lyte",    year:1847, genre:'gospel', decade:'1940s', difficulty:2, deezerQuery:"Abide With Me hymn" },
  { id:378, title:"How Great Thou Art",           artist:"Traditional",           year:1885, genre:'gospel', decade:'1950s', difficulty:1, deezerQuery:"How Great Thou Art hymn" },
  { id:379, title:"Hallelujah Chorus (Gospel)",   artist:"Traditional",           year:1920, genre:'gospel', decade:'1940s', difficulty:2, deezerQuery:"Hallelujah gospel choir" },

  // ══════════════════════════════════════════════════════
  // FOLK & TRADITIONNELLES — MONDE ENTIER
  // ══════════════════════════════════════════════════════
  { id:380, title:"La Marseillaise",              artist:"Claude Joseph Rouget de Lisle",year:1792,genre:'trad',decade:'1940s',difficulty:1, deezerQuery:"La Marseillaise hymne national" },
  { id:381, title:"Ode à la Joie (Hymne UE)",     artist:"Ludwig van Beethoven",  year:1824, genre:'trad', decade:'1940s', difficulty:1, deezerQuery:"Ode to Joy European anthem Beethoven" },
  { id:382, title:"God Save the King",            artist:"Traditional British",   year:1744, genre:'trad', decade:'1940s', difficulty:1, deezerQuery:"God Save the King anthem" },
  { id:383, title:"Greensleeves",                 artist:"Traditional English",   year:1580, genre:'folk', decade:'1940s', difficulty:1, deezerQuery:"Greensleeves traditional English" },
  { id:384, title:"Danny Boy (Londonderry Air)",  artist:"Traditional Irish",     year:1913, genre:'folk', decade:'1940s', difficulty:1, deezerQuery:"Danny Boy Londonderry Air" },
  { id:385, title:"Scarborough Fair",             artist:"Traditional English",   year:1670, genre:'folk', decade:'1940s', difficulty:1, deezerQuery:"Scarborough Fair traditional" },
  { id:386, title:"House of the Rising Sun (trad.)","artist":"Traditional American",year:1928,genre:'folk',decade:'1940s',difficulty:2, deezerQuery:"House of the Rising Sun traditional folk" },
  { id:387, title:"Oh! Susanna",                  artist:"Stephen Foster",        year:1848, genre:'folk', decade:'1940s', difficulty:1, deezerQuery:"Oh Susanna Stephen Foster" },
  { id:388, title:"Camptown Races",               artist:"Stephen Foster",        year:1850, genre:'folk', decade:'1940s', difficulty:2, deezerQuery:"Camptown Races Stephen Foster" },
  { id:389, title:"Beautiful Dreamer",            artist:"Stephen Foster",        year:1864, genre:'folk', decade:'1940s', difficulty:2, deezerQuery:"Beautiful Dreamer Stephen Foster" },
  { id:390, title:"Clementine",                   artist:"Traditional American",  year:1884, genre:'folk', decade:'1940s', difficulty:1, deezerQuery:"Oh My Darling Clementine traditional" },
  { id:391, title:"She'll Be Coming 'Round the Mountain","artist":"Traditional",  year:1899, genre:'folk', decade:'1940s', difficulty:1, deezerQuery:"She'll Be Coming Round the Mountain" },
  { id:392, title:"Red River Valley",             artist:"Traditional American",  year:1879, genre:'folk', decade:'1940s', difficulty:2, deezerQuery:"Red River Valley traditional folk" },
  { id:393, title:"Tom Dooley",                   artist:"Traditional American",  year:1866, genre:'folk', decade:'1950s', difficulty:2, deezerQuery:"Tom Dooley Kingston Trio folk" },
  { id:394, title:"Michael Row the Boat Ashore",  artist:"Traditional",           year:1867, genre:'folk', decade:'1960s', difficulty:1, deezerQuery:"Michael Row the Boat Ashore" },
  { id:395, title:"Kumbaya",                      artist:"Traditional",           year:1926, genre:'folk', decade:'1950s', difficulty:1, deezerQuery:"Kumbaya traditional" },
  { id:396, title:"This Land Is Your Land",       artist:"Woody Guthrie",         year:1940, genre:'folk', decade:'1940s', difficulty:1, deezerQuery:"Woody Guthrie This Land Is Your Land" },
  { id:397, title:"We Shall Overcome",            artist:"Traditional",           year:1945, genre:'folk', decade:'1960s', difficulty:1, deezerQuery:"We Shall Overcome civil rights" },
  { id:398, title:"Auld Lang Syne",               artist:"Robert Burns",          year:1788, genre:'folk', decade:'1940s', difficulty:1, deezerQuery:"Auld Lang Syne traditional" },
  { id:399, title:"Yankee Doodle",                artist:"Traditional American",  year:1755, genre:'trad', decade:'1940s', difficulty:1, deezerQuery:"Yankee Doodle traditional" },
  { id:400, title:"La Cucaracha",                 artist:"Traditional Mexican",   year:1910, genre:'trad', decade:'1940s', difficulty:1, deezerQuery:"La Cucaracha traditional Mexican" },
  { id:401, title:"El Cóndor Pasa",               artist:"Daniel Alomía Robles",  year:1913, genre:'folk', decade:'1940s', difficulty:2, deezerQuery:"El Condor Pasa traditional Peruvian" },
  { id:402, title:"Frère Jacques",                artist:"Traditional French",    year:1811, genre:'trad', decade:'1940s', difficulty:1, deezerQuery:"Frere Jacques comptine française" },
  { id:403, title:"Au Clair de la Lune",          artist:"Traditional French",    year:1820, genre:'trad', decade:'1940s', difficulty:1, deezerQuery:"Au Clair de la Lune chanson traditionnelle" },
  { id:404, title:"Alouette",                     artist:"Traditional French",    year:1879, genre:'trad', decade:'1940s', difficulty:1, deezerQuery:"Alouette gentille alouette chanson" },
  { id:405, title:"Sur le pont d'Avignon",        artist:"Traditional French",    year:1853, genre:'trad', decade:'1940s', difficulty:1, deezerQuery:"Sur le Pont d Avignon chanson" },
  { id:406, title:"À la claire fontaine",         artist:"Traditional French",    year:1608, genre:'trad', decade:'1940s', difficulty:2, deezerQuery:"A la claire fontaine chanson québécoise" },
  { id:407, title:"Guantanamera",                 artist:"José Martí / Joseíto Fernández",year:1928,genre:'folk',decade:'1940s',difficulty:1, deezerQuery:"Guantanamera traditional Cuban" },
  { id:408, title:"La Bamba (traditionnelle)",    artist:"Traditional Mexican",   year:1683, genre:'folk', decade:'1940s', difficulty:1, deezerQuery:"La Bamba traditional veracruz" },
  { id:409, title:"Sakura Sakura",                artist:"Traditional Japanese",  year:1888, genre:'trad', decade:'1940s', difficulty:2, deezerQuery:"Sakura Sakura traditional Japanese" },
  { id:410, title:"O Sole Mio",                   artist:"Eduardo di Capua",      year:1898, genre:'folk', decade:'1940s', difficulty:1, deezerQuery:"O Sole Mio traditional Italian" },
  { id:411, title:"Santa Lucia",                  artist:"Teodoro Cottrau",       year:1849, genre:'folk', decade:'1940s', difficulty:2, deezerQuery:"Santa Lucia traditional Italian" },
  { id:412, title:"Edelweiss",                    artist:"Rodgers & Hammerstein", year:1959, genre:'folk', decade:'1950s', difficulty:1, deezerQuery:"Edelweiss Sound of Music" },
  { id:413, title:"Waltzing Matilda",             artist:"A.B. Paterson",         year:1895, genre:'folk', decade:'1940s', difficulty:2, deezerQuery:"Waltzing Matilda traditional Australian" },

  // ══════════════════════════════════════════════════════
  // JAZZ STANDARDS — DOMAINE PUBLIC (pré-1928)
  // ══════════════════════════════════════════════════════
  { id:414, title:"Basin Street Blues",           artist:"Spencer Williams",      year:1926, genre:'jazz', decade:'1940s', difficulty:2, deezerQuery:"Basin Street Blues jazz standard" },
  { id:415, title:"Ain't Misbehavin'",            artist:"Fats Waller",           year:1929, genre:'jazz', decade:'1940s', difficulty:2, deezerQuery:"Fats Waller Ain't Misbehavin" },
  { id:416, title:"Sweet Georgia Brown",          artist:"Ben Bernie",            year:1925, genre:'jazz', decade:'1940s', difficulty:1, deezerQuery:"Sweet Georgia Brown jazz standard" },
  { id:417, title:"After You've Gone",            artist:"Henry Creamer",         year:1918, genre:'jazz', decade:'1940s', difficulty:3, deezerQuery:"After You've Gone jazz standard" },
  { id:418, title:"Tiger Rag",                    artist:"Original Dixieland Jazz Band",year:1917,genre:'jazz',decade:'1940s',difficulty:2, deezerQuery:"Tiger Rag Dixieland jazz" },
  { id:419, title:"12th Street Rag",              artist:"Euday Bowman",          year:1914, genre:'jazz', decade:'1940s', difficulty:2, deezerQuery:"12th Street Rag ragtime" },
  { id:420, title:"Maple Leaf Rag",               artist:"Scott Joplin",          year:1899, genre:'jazz', decade:'1940s', difficulty:2, deezerQuery:"Scott Joplin Maple Leaf Rag" },
  { id:421, title:"The Entertainer",              artist:"Scott Joplin",          year:1902, genre:'jazz', decade:'1940s', difficulty:1, deezerQuery:"Scott Joplin The Entertainer ragtime" },
  { id:422, title:"Alexander's Ragtime Band",     artist:"Irving Berlin",         year:1911, genre:'jazz', decade:'1940s', difficulty:2, deezerQuery:"Irving Berlin Alexander's Ragtime Band" },
  { id:423, title:"Dinah",                        artist:"Harry Akst",            year:1925, genre:'jazz', decade:'1940s', difficulty:2, deezerQuery:"Dinah jazz standard 1925" },
  { id:424, title:"Five Foot Two Eyes of Blue",   artist:"Ray Henderson",         year:1925, genre:'jazz', decade:'1940s', difficulty:3, deezerQuery:"Five Foot Two Eyes of Blue 1925" },

  // ══════════════════════════════════════════════════════
  // OPÉRA & OPÉRETTE — DOMAINE PUBLIC
  // ══════════════════════════════════════════════════════
  { id:425, title:"La Traviata — Ah fors'è lui",  artist:"Giuseppe Verdi",        year:1853, genre:'operette', decade:'1960s', difficulty:3, deezerQuery:"Verdi La Traviata Ah fors e lui" },
  { id:426, title:"Rigoletto — La donna è mobile","artist":"Giuseppe Verdi",      year:1851, genre:'operette', decade:'1960s', difficulty:2, deezerQuery:"Verdi Rigoletto La donna e mobile" },
  { id:427, title:"Carmen — L'amour est un oiseau rebelle","artist":"Georges Bizet",year:1875,genre:'operette',decade:'1960s',difficulty:1, deezerQuery:"Bizet Carmen Habanera L amour est un oiseau" },
  { id:428, title:"Carmen — Toréador En Garde",   artist:"Georges Bizet",         year:1875, genre:'operette', decade:'1960s', difficulty:2, deezerQuery:"Bizet Carmen Toreador Song" },
  { id:429, title:"La Flûte Enchantée — La Reine de la Nuit","artist":"Wolfgang A. Mozart",year:1791,genre:'operette',decade:'1950s',difficulty:2, deezerQuery:"Mozart Queen of Night Aria Magic Flute" },
  { id:430, title:"Don Giovanni — Là ci darem la mano","artist":"Wolfgang A. Mozart",year:1787,genre:'operette',decade:'1950s',difficulty:3, deezerQuery:"Mozart Don Giovanni La ci darem" },
  { id:431, title:"Les Noces de Figaro — Ouverture","artist":"Wolfgang A. Mozart",year:1786,genre:'operette',decade:'1950s',difficulty:2, deezerQuery:"Mozart Marriage of Figaro Overture" },
  { id:432, title:"Cosi fan tutte — Ouverture",   artist:"Wolfgang A. Mozart",    year:1790, genre:'operette', decade:'1950s', difficulty:3, deezerQuery:"Mozart Cosi fan tutte Overture" },
  { id:433, title:"Barbe-Bleue — Ouverture",      artist:"Jacques Offenbach",     year:1866, genre:'operette', decade:'1960s', difficulty:3, deezerQuery:"Offenbach Barbe Bleue Overture" },
  { id:434, title:"Orphée aux Enfers — Galop Infernal","artist":"Jacques Offenbach",year:1858,genre:'operette',decade:'1960s',difficulty:1, deezerQuery:"Offenbach Orpheus Underworld Can-Can" },
  { id:435, title:"La Belle Hélène — Ouverture",  artist:"Jacques Offenbach",     year:1864, genre:'operette', decade:'1960s', difficulty:3, deezerQuery:"Offenbach La Belle Helene" },
  { id:436, title:"La Vie Parisienne",            artist:"Jacques Offenbach",     year:1866, genre:'operette', decade:'1960s', difficulty:2, deezerQuery:"Offenbach La Vie Parisienne" },
  { id:437, title:"L'Italienne à Alger — Ouverture","artist":"Gioachino Rossini", year:1813, genre:'operette', decade:'1960s', difficulty:2, deezerQuery:"Rossini L Italiana in Algeri Overture" },
  { id:438, title:"Guillaume Tell — Finale",      artist:"Gioachino Rossini",     year:1829, genre:'operette', decade:'1960s', difficulty:1, deezerQuery:"Rossini William Tell Overture finale" },
  { id:439, title:"Le Barbier de Séville — Ouverture","artist":"Gioachino Rossini",year:1816,genre:'operette',decade:'1960s',difficulty:1, deezerQuery:"Rossini Barber of Seville Overture" },
  { id:440, title:"Cenerentola — Non più mesta",  artist:"Gioachino Rossini",     year:1817, genre:'operette', decade:'1960s', difficulty:3, deezerQuery:"Rossini Cenerentola Non piu mesta" },
  { id:441, title:"La Bohème — Si mi chiamano Mimi","artist":"Giacomo Puccini",   year:1896, genre:'operette', decade:'1960s', difficulty:2, deezerQuery:"Puccini La Boheme Si mi chiamano Mimi" },
  { id:442, title:"Tosca — Vissi d'Arte",         artist:"Giacomo Puccini",       year:1900, genre:'operette', decade:'1960s', difficulty:2, deezerQuery:"Puccini Tosca Vissi d Arte" },
  { id:443, title:"Madama Butterfly — Un bel di vedremo","artist":"Giacomo Puccini",year:1904,genre:'operette',decade:'1960s',difficulty:2, deezerQuery:"Puccini Madama Butterfly Un bel di" },
  { id:444, title:"Faust — Jewel Song",           artist:"Charles Gounod",        year:1859, genre:'operette', decade:'1960s', difficulty:3, deezerQuery:"Gounod Faust Air des Bijoux Jewel Song" },
  { id:445, title:"Samson et Dalila — Mon Cœur",  artist:"Camille Saint-Saëns",   year:1877, genre:'operette', decade:'1960s', difficulty:2, deezerQuery:"Saint-Saens Samson Dalila Mon coeur s ouvre" },
  { id:446, title:"Roméo et Juliette — Je veux vivre","artist":"Charles Gounod",  year:1867, genre:'operette', decade:'1960s', difficulty:3, deezerQuery:"Gounod Romeo Juliet Je veux vivre" },

  // ══════════════════════════════════════════════════════
  // COMPTINES & CHANTS TRADITIONNELS (RECONNUS MONDIALEMENT)
  // ══════════════════════════════════════════════════════
  { id:447, title:"Happy Birthday to You",        artist:"Mildred & Patty Hill",  year:1893, genre:'trad', decade:'1940s', difficulty:1, deezerQuery:"Happy Birthday to You traditional" },
  { id:448, title:"Jingle Bells",                 artist:"James Lord Pierpont",   year:1857, genre:'trad', decade:'1940s', difficulty:1, deezerQuery:"Jingle Bells traditional christmas" },
  { id:449, title:"Silent Night",                 artist:"Franz Xaver Gruber",    year:1818, genre:'trad', decade:'1940s', difficulty:1, deezerQuery:"Silent Night Stille Nacht traditional" },
  { id:450, title:"Deck the Halls",               artist:"Traditional Welsh",     year:1862, genre:'trad', decade:'1940s', difficulty:1, deezerQuery:"Deck the Halls traditional Christmas" },
  { id:451, title:"O Christmas Tree",             artist:"Traditional German",    year:1824, genre:'trad', decade:'1940s', difficulty:1, deezerQuery:"O Christmas Tree O Tannenbaum traditional" },
  { id:452, title:"We Wish You a Merry Christmas","artist":"Traditional English", year:1935, genre:'trad', decade:'1940s', difficulty:1, deezerQuery:"We Wish You a Merry Christmas traditional" },
  { id:453, title:"Twinkle Twinkle Little Star",  artist:"Traditional",           year:1806, genre:'trad', decade:'1940s', difficulty:1, deezerQuery:"Twinkle Twinkle Little Star" },
  { id:454, title:"Mary Had a Little Lamb",       artist:"Sarah Josepha Hale",    year:1830, genre:'trad', decade:'1940s', difficulty:1, deezerQuery:"Mary Had a Little Lamb traditional" },
  { id:455, title:"Row Row Row Your Boat",        artist:"Traditional American",  year:1852, genre:'trad', decade:'1940s', difficulty:1, deezerQuery:"Row Row Row Your Boat traditional" },
  { id:456, title:"Old MacDonald Had a Farm",     artist:"Traditional",           year:1917, genre:'trad', decade:'1940s', difficulty:1, deezerQuery:"Old MacDonald Had a Farm traditional" },
  { id:457, title:"For He's a Jolly Good Fellow", artist:"Traditional English",   year:1709, genre:'trad', decade:'1940s', difficulty:1, deezerQuery:"For He's a Jolly Good Fellow traditional" },
  { id:458, title:"Lavender's Blue",              artist:"Traditional English",   year:1680, genre:'trad', decade:'1940s', difficulty:2, deezerQuery:"Lavender's Blue Dilly Dilly traditional" },
  { id:459, title:"Pop Goes the Weasel",          artist:"Traditional English",   year:1855, genre:'trad', decade:'1940s', difficulty:1, deezerQuery:"Pop Goes the Weasel traditional" },
  { id:460, title:"If You're Happy and You Know It","artist":"Traditional",       year:1942, genre:'trad', decade:'1940s', difficulty:1, deezerQuery:"If You're Happy and You Know It" },

  // ══════════════════════════════════════════════════════
  // JAZZ — BOSSA NOVA & CONTEMPORAIN
  // ══════════════════════════════════════════════════════
  { id:461, title:"Besame Mucho",              artist:"Chet Baker",            year:1954, genre:'jazz',       decade:'1950s', difficulty:2, deezerQuery:"Chet Baker Besame Mucho" },
  { id:462, title:"My Funny Valentine",        artist:"Chet Baker",            year:1954, genre:'jazz',       decade:'1950s', difficulty:2, deezerQuery:"Chet Baker My Funny Valentine" },
  { id:463, title:"Waltz for Debby",           artist:"Bill Evans",            year:1961, genre:'jazz',       decade:'1960s', difficulty:3, deezerQuery:"Bill Evans Waltz for Debby" },
  { id:464, title:"Girl from Ipanema",         artist:"Stan Getz",             year:1964, genre:'jazz',       decade:'1960s', difficulty:1, deezerQuery:"Stan Getz Girl from Ipanema" },
  { id:465, title:"Mas Que Nada",              artist:"Sergio Mendes",         year:1966, genre:'jazz',       decade:'1960s', difficulty:2, deezerQuery:"Sergio Mendes Mas Que Nada" },
  { id:466, title:"Cantaloupe Island",         artist:"Herbie Hancock",        year:1964, genre:'jazz',       decade:'1960s', difficulty:3, deezerQuery:"Herbie Hancock Cantaloupe Island" },
  { id:467, title:"Don't Know Why",            artist:"Norah Jones",           year:2002, genre:'jazz',       decade:'2000s', difficulty:1, deezerQuery:"Norah Jones Don't Know Why" },
  { id:468, title:"Come Away with Me",         artist:"Norah Jones",           year:2002, genre:'jazz',       decade:'2000s', difficulty:1, deezerQuery:"Norah Jones Come Away with Me" },
  { id:469, title:"Feeling Good",              artist:"Nina Simone",           year:1965, genre:'jazz',       decade:'1960s', difficulty:1, deezerQuery:"Nina Simone Feeling Good" },
  { id:470, title:"Sinnerman",                 artist:"Nina Simone",           year:1965, genre:'jazz',       decade:'1960s', difficulty:2, deezerQuery:"Nina Simone Sinnerman" },
  { id:471, title:"Mack the Knife",            artist:"Bobby Darin",           year:1959, genre:'jazz',       decade:'1950s', difficulty:1, deezerQuery:"Bobby Darin Mack the Knife" },
  { id:472, title:"Almost Blue",               artist:"Chet Baker",            year:1988, genre:'jazz',       decade:'1980s', difficulty:3, deezerQuery:"Chet Baker Almost Blue" },
  { id:473, title:"Spain",                     artist:"Chick Corea",           year:1972, genre:'jazz',       decade:'1970s', difficulty:3, deezerQuery:"Chick Corea Spain" },
  { id:474, title:"Autumn in New York",        artist:"Ella Fitzgerald",       year:1956, genre:'jazz',       decade:'1950s', difficulty:2, deezerQuery:"Ella Fitzgerald Autumn in New York" },

  // ══════════════════════════════════════════════════════
  // CHANSON FRANÇAISE — CLASSIQUES & MODERNES
  // ══════════════════════════════════════════════════════
  { id:475, title:"La Javanaise",              artist:"Serge Gainsbourg",      year:1963, genre:'french',     decade:'1960s', difficulty:2, deezerQuery:"Serge Gainsbourg La Javanaise" },
  { id:476, title:"Je t'aime moi non plus",    artist:"Gainsbourg & Birkin",   year:1969, genre:'french',     decade:'1960s', difficulty:1, deezerQuery:"Gainsbourg Birkin Je t aime moi non plus" },
  { id:477, title:"Les Feuilles Mortes",       artist:"Yves Montand",          year:1946, genre:'french',     decade:'1940s', difficulty:2, deezerQuery:"Yves Montand Les Feuilles Mortes" },
  { id:478, title:"Sous le ciel de Paris",     artist:"Édith Piaf",            year:1954, genre:'french',     decade:'1950s', difficulty:1, deezerQuery:"Edith Piaf Sous le ciel de Paris" },
  { id:479, title:"Milord",                    artist:"Édith Piaf",            year:1959, genre:'french',     decade:'1950s', difficulty:2, deezerQuery:"Edith Piaf Milord" },
  { id:480, title:"La Chanson des Vieux Amants","artist":"Jacques Brel",       year:1967, genre:'french',     decade:'1960s', difficulty:3, deezerQuery:"Jacques Brel La Chanson des Vieux Amants" },
  { id:481, title:"Les Copains d'Abord",       artist:"Georges Brassens",      year:1964, genre:'french',     decade:'1960s', difficulty:2, deezerQuery:"Georges Brassens Les Copains d Abord" },
  { id:482, title:"Le Gorille",                artist:"Georges Brassens",      year:1952, genre:'french',     decade:'1950s', difficulty:3, deezerQuery:"Georges Brassens Le Gorille" },
  { id:483, title:"L'Auvergnat",               artist:"Georges Brassens",      year:1954, genre:'french',     decade:'1950s', difficulty:2, deezerQuery:"Georges Brassens L Auvergnat" },
  { id:484, title:"Quelque chose de Tennessee","artist":"Johnny Hallyday",     year:1985, genre:'french',     decade:'1980s', difficulty:1, deezerQuery:"Johnny Hallyday Quelque chose de Tennessee" },
  { id:485, title:"Allumer le feu",            artist:"Johnny Hallyday",       year:1998, genre:'french',     decade:'1990s', difficulty:1, deezerQuery:"Johnny Hallyday Allumer le feu" },
  { id:486, title:"L'envie",                   artist:"Johnny Hallyday",       year:1980, genre:'french',     decade:'1980s', difficulty:2, deezerQuery:"Johnny Hallyday L envie" },
  { id:487, title:"Voyage, voyage",            artist:"Desireless",            year:1986, genre:'french',     decade:'1980s', difficulty:1, deezerQuery:"Desireless Voyage voyage" },
  { id:488, title:"Ella, elle l'a",            artist:"France Gall",           year:1987, genre:'french',     decade:'1980s', difficulty:1, deezerQuery:"France Gall Ella elle l a" },
  { id:489, title:"Je te donne",               artist:"Jean-Jacques Goldman",  year:1990, genre:'french',     decade:'1990s', difficulty:1, deezerQuery:"Jean-Jacques Goldman Je te donne" },
  { id:490, title:"Né en 17 à Leidenstadt",   artist:"Jean-Jacques Goldman",  year:1990, genre:'french',     decade:'1990s', difficulty:2, deezerQuery:"Goldman Ne en 17 a Leidenstadt" },
  { id:491, title:"Mon vieux",                 artist:"Daniel Guichard",       year:1973, genre:'french',     decade:'1970s', difficulty:2, deezerQuery:"Daniel Guichard Mon vieux" },
  { id:492, title:"Je suis malade",            artist:"Serge Lama",            year:1973, genre:'french',     decade:'1970s', difficulty:2, deezerQuery:"Serge Lama Je suis malade" },
  { id:493, title:"Tombé pour la France",      artist:"Étienne Daho",          year:1985, genre:'french',     decade:'1980s', difficulty:2, deezerQuery:"Etienne Daho Tombe pour la France" },
  { id:494, title:"On ira",                    artist:"Zaz",                   year:2013, genre:'french',     decade:'2010s', difficulty:1, deezerQuery:"Zaz On ira" },
  { id:495, title:"Ta fête",                   artist:"Stromae",               year:2013, genre:'french',     decade:'2010s', difficulty:2, deezerQuery:"Stromae Ta fete" },

  // ══════════════════════════════════════════════════════
  // ROCK — CLASSIQUES MANQUANTS
  // ══════════════════════════════════════════════════════
  { id:496, title:"Comfortably Numb",          artist:"Pink Floyd",            year:1979, genre:'rock',       decade:'1970s', difficulty:1, deezerQuery:"Pink Floyd Comfortably Numb" },
  { id:497, title:"Another Brick in the Wall", artist:"Pink Floyd",            year:1979, genre:'rock',       decade:'1970s', difficulty:1, deezerQuery:"Pink Floyd Another Brick in the Wall" },
  { id:498, title:"Wish You Were Here",        artist:"Pink Floyd",            year:1975, genre:'rock',       decade:'1970s', difficulty:2, deezerQuery:"Pink Floyd Wish You Were Here" },
  { id:499, title:"Purple Haze",               artist:"Jimi Hendrix",          year:1967, genre:'rock',       decade:'1960s', difficulty:1, deezerQuery:"Jimi Hendrix Purple Haze" },
  { id:500, title:"Little Wing",               artist:"Jimi Hendrix",          year:1967, genre:'rock',       decade:'1960s', difficulty:2, deezerQuery:"Jimi Hendrix Little Wing" },
  { id:501, title:"Me and Bobby McGee",        artist:"Janis Joplin",          year:1971, genre:'rock',       decade:'1970s', difficulty:2, deezerQuery:"Janis Joplin Me and Bobby McGee" },
  { id:502, title:"Pinball Wizard",            artist:"The Who",               year:1969, genre:'rock',       decade:'1960s', difficulty:2, deezerQuery:"The Who Pinball Wizard" },
  { id:503, title:"Baba O'Riley",              artist:"The Who",               year:1971, genre:'rock',       decade:'1970s', difficulty:2, deezerQuery:"The Who Baba O Riley" },
  { id:504, title:"Money for Nothing",         artist:"Dire Straits",          year:1985, genre:'rock',       decade:'1980s', difficulty:1, deezerQuery:"Dire Straits Money for Nothing" },
  { id:505, title:"Free Fallin'",              artist:"Tom Petty",             year:1989, genre:'rock',       decade:'1980s', difficulty:1, deezerQuery:"Tom Petty Free Fallin" },
  { id:506, title:"Losing My Religion",        artist:"R.E.M.",                year:1991, genre:'rock',       decade:'1990s', difficulty:1, deezerQuery:"REM Losing My Religion" },
  { id:507, title:"Everybody Hurts",           artist:"R.E.M.",                year:1992, genre:'rock',       decade:'1990s', difficulty:1, deezerQuery:"REM Everybody Hurts" },
  { id:508, title:"Enjoy the Silence",         artist:"Depeche Mode",          year:1990, genre:'electronic', decade:'1990s', difficulty:1, deezerQuery:"Depeche Mode Enjoy the Silence" },
  { id:509, title:"Personal Jesus",            artist:"Depeche Mode",          year:1989, genre:'electronic', decade:'1980s', difficulty:2, deezerQuery:"Depeche Mode Personal Jesus" },
  { id:510, title:"Love Will Tear Us Apart",   artist:"Joy Division",          year:1980, genre:'rock',       decade:'1980s', difficulty:2, deezerQuery:"Joy Division Love Will Tear Us Apart" },
  { id:511, title:"Just Like Heaven",          artist:"The Cure",              year:1987, genre:'rock',       decade:'1980s', difficulty:2, deezerQuery:"The Cure Just Like Heaven" },
  { id:512, title:"Creep",                     artist:"TLC",                   year:1994, genre:'rnb',        decade:'1990s', difficulty:2, deezerQuery:"TLC Creep" },
  { id:513, title:"Don't Stop 'Til You Get Enough","artist":"Michael Jackson", year:1979, genre:'pop',        decade:'1970s', difficulty:1, deezerQuery:"Michael Jackson Don't Stop Till You Get Enough" },
  { id:514, title:"Man in the Mirror",         artist:"Michael Jackson",       year:1987, genre:'pop',        decade:'1980s', difficulty:1, deezerQuery:"Michael Jackson Man in the Mirror" },
  { id:515, title:"Black or White",            artist:"Michael Jackson",       year:1991, genre:'pop',        decade:'1990s', difficulty:1, deezerQuery:"Michael Jackson Black or White" },

  // ══════════════════════════════════════════════════════
  // MÉTAL — RENFORTS
  // ══════════════════════════════════════════════════════
  { id:516, title:"Run to the Hills",          artist:"Iron Maiden",           year:1982, genre:'metal',      decade:'1980s', difficulty:1, deezerQuery:"Iron Maiden Run to the Hills" },
  { id:517, title:"The Trooper",               artist:"Iron Maiden",           year:1983, genre:'metal',      decade:'1980s', difficulty:2, deezerQuery:"Iron Maiden The Trooper" },
  { id:518, title:"Fear of the Dark",          artist:"Iron Maiden",           year:1992, genre:'metal',      decade:'1990s', difficulty:2, deezerQuery:"Iron Maiden Fear of the Dark" },
  { id:519, title:"Breaking the Law",          artist:"Judas Priest",          year:1980, genre:'metal',      decade:'1980s', difficulty:1, deezerQuery:"Judas Priest Breaking the Law" },
  { id:520, title:"Crazy Train",               artist:"Ozzy Osbourne",         year:1980, genre:'metal',      decade:'1980s', difficulty:1, deezerQuery:"Ozzy Osbourne Crazy Train" },
  { id:521, title:"Symphony of Destruction",   artist:"Megadeth",              year:1992, genre:'metal',      decade:'1990s', difficulty:2, deezerQuery:"Megadeth Symphony of Destruction" },
  { id:522, title:"Chop Suey!",                artist:"System of a Down",      year:2001, genre:'metal',      decade:'2000s', difficulty:1, deezerQuery:"System of a Down Chop Suey" },
  { id:523, title:"Bodies",                    artist:"Drowning Pool",         year:2001, genre:'metal',      decade:'2000s', difficulty:2, deezerQuery:"Drowning Pool Bodies" },
  { id:524, title:"Bring Me to Life",          artist:"Evanescence",           year:2003, genre:'metal',      decade:'2000s', difficulty:1, deezerQuery:"Evanescence Bring Me to Life" },
  { id:525, title:"My Immortal",               artist:"Evanescence",           year:2003, genre:'metal',      decade:'2000s', difficulty:1, deezerQuery:"Evanescence My Immortal" },

  // ══════════════════════════════════════════════════════
  // SOUL / R&B — CLASSIQUES MANQUANTS
  // ══════════════════════════════════════════════════════
  { id:526, title:"Let's Get It On",           artist:"Marvin Gaye",           year:1973, genre:'soul',       decade:'1970s', difficulty:1, deezerQuery:"Marvin Gaye Let's Get It On" },
  { id:527, title:"Sexual Healing",            artist:"Marvin Gaye",           year:1982, genre:'soul',       decade:'1980s', difficulty:1, deezerQuery:"Marvin Gaye Sexual Healing" },
  { id:528, title:"What's Going On",           artist:"Marvin Gaye",           year:1971, genre:'soul',       decade:'1970s', difficulty:1, deezerQuery:"Marvin Gaye What's Going On" },
  { id:529, title:"I Heard It Through the Grapevine","artist":"Marvin Gaye",   year:1968, genre:'soul',       decade:'1960s', difficulty:1, deezerQuery:"Marvin Gaye I Heard It Through the Grapevine" },
  { id:530, title:"Let's Stay Together",       artist:"Al Green",              year:1972, genre:'soul',       decade:'1970s', difficulty:1, deezerQuery:"Al Green Let's Stay Together" },
  { id:531, title:"A Change Is Gonna Come",    artist:"Sam Cooke",             year:1964, genre:'soul',       decade:'1960s', difficulty:2, deezerQuery:"Sam Cooke A Change Is Gonna Come" },
  { id:532, title:"Wonderful World",           artist:"Sam Cooke",             year:1960, genre:'soul',       decade:'1960s', difficulty:1, deezerQuery:"Sam Cooke Wonderful World" },
  { id:533, title:"I Will Always Love You",    artist:"Whitney Houston",       year:1992, genre:'soul',       decade:'1990s', difficulty:1, deezerQuery:"Whitney Houston I Will Always Love You" },
  { id:534, title:"Greatest Love of All",      artist:"Whitney Houston",       year:1985, genre:'soul',       decade:'1980s', difficulty:1, deezerQuery:"Whitney Houston Greatest Love of All" },
  { id:535, title:"Killing Me Softly",         artist:"Roberta Flack",         year:1973, genre:'soul',       decade:'1970s', difficulty:1, deezerQuery:"Roberta Flack Killing Me Softly" },
  { id:536, title:"Try a Little Tenderness",   artist:"Otis Redding",          year:1966, genre:'soul',       decade:'1960s', difficulty:2, deezerQuery:"Otis Redding Try a Little Tenderness" },
  { id:537, title:"Midnight Train to Georgia", artist:"Gladys Knight",         year:1973, genre:'soul',       decade:'1970s', difficulty:2, deezerQuery:"Gladys Knight Midnight Train to Georgia" },
  { id:538, title:"Son of a Preacher Man",     artist:"Dusty Springfield",     year:1968, genre:'soul',       decade:'1960s', difficulty:2, deezerQuery:"Dusty Springfield Son of a Preacher Man" },

  // ══════════════════════════════════════════════════════
  // FUNK — CLASSIQUES
  // ══════════════════════════════════════════════════════
  { id:539, title:"Give Up the Funk",          artist:"Parliament",            year:1976, genre:'funk',       decade:'1970s', difficulty:2, deezerQuery:"Parliament Give Up the Funk" },
  { id:540, title:"Everyday People",           artist:"Sly & the Family Stone",year:1968, genre:'funk',       decade:'1960s', difficulty:1, deezerQuery:"Sly Family Stone Everyday People" },
  { id:541, title:"Superbad",                  artist:"James Brown",           year:1970, genre:'funk',       decade:'1970s', difficulty:2, deezerQuery:"James Brown Superbad" },
  { id:542, title:"Pick Up the Pieces",        artist:"Average White Band",    year:1975, genre:'funk',       decade:'1970s', difficulty:2, deezerQuery:"Average White Band Pick Up the Pieces" },
  { id:543, title:"Play That Funky Music",     artist:"Wild Cherry",           year:1976, genre:'funk',       decade:'1970s', difficulty:1, deezerQuery:"Wild Cherry Play That Funky Music" },
  { id:544, title:"Boogie Wonderland",         artist:"Earth, Wind & Fire",    year:1979, genre:'funk',       decade:'1970s', difficulty:1, deezerQuery:"Earth Wind Fire Boogie Wonderland" },
  { id:545, title:"Jungle Boogie",             artist:"Kool & the Gang",       year:1973, genre:'funk',       decade:'1970s', difficulty:2, deezerQuery:"Kool and the Gang Jungle Boogie" },
  { id:546, title:"Celebration",              artist:"Kool & the Gang",       year:1980, genre:'funk',       decade:'1980s', difficulty:1, deezerQuery:"Kool and the Gang Celebration" },
  { id:547, title:"Upside Down",               artist:"Diana Ross",            year:1980, genre:'funk',       decade:'1980s', difficulty:1, deezerQuery:"Diana Ross Upside Down" },

  // ══════════════════════════════════════════════════════
  // DISCO — RENFORTS
  // ══════════════════════════════════════════════════════
  { id:548, title:"Hot Stuff",                 artist:"Donna Summer",          year:1979, genre:'disco',      decade:'1970s', difficulty:1, deezerQuery:"Donna Summer Hot Stuff" },
  { id:549, title:"Bad Girls",                 artist:"Donna Summer",          year:1979, genre:'disco',      decade:'1970s', difficulty:1, deezerQuery:"Donna Summer Bad Girls" },
  { id:550, title:"Funkytown",                 artist:"Lipps Inc",             year:1980, genre:'disco',      decade:'1980s', difficulty:1, deezerQuery:"Lipps Inc Funkytown" },
  { id:551, title:"Get Down Tonight",          artist:"KC and the Sunshine Band",year:1975,genre:'disco',     decade:'1970s', difficulty:2, deezerQuery:"KC Sunshine Band Get Down Tonight" },
  { id:552, title:"Ring My Bell",              artist:"Anita Ward",            year:1979, genre:'disco',      decade:'1970s', difficulty:2, deezerQuery:"Anita Ward Ring My Bell" },
  { id:553, title:"Rasputin",                  artist:"Boney M.",              year:1978, genre:'disco',      decade:'1970s', difficulty:1, deezerQuery:"Boney M Rasputin" },
  { id:554, title:"Rivers of Babylon",         artist:"Boney M.",              year:1978, genre:'disco',      decade:'1970s', difficulty:1, deezerQuery:"Boney M Rivers of Babylon" },
  { id:555, title:"Boogie Nights",             artist:"Heatwave",              year:1977, genre:'disco',      decade:'1970s', difficulty:2, deezerQuery:"Heatwave Boogie Nights" },

  // ══════════════════════════════════════════════════════
  // ÉLECTRONIQUE — TECHNO / HOUSE / EDM
  // ══════════════════════════════════════════════════════
  { id:556, title:"Firestarter",               artist:"The Prodigy",           year:1996, genre:'electronic', decade:'1990s', difficulty:1, deezerQuery:"The Prodigy Firestarter" },
  { id:557, title:"Breathe",                   artist:"The Prodigy",           year:1996, genre:'electronic', decade:'1990s', difficulty:1, deezerQuery:"The Prodigy Breathe" },
  { id:558, title:"Block Rockin' Beats",       artist:"Chemical Brothers",     year:1997, genre:'electronic', decade:'1990s', difficulty:2, deezerQuery:"Chemical Brothers Block Rockin Beats" },
  { id:559, title:"Praise You",                artist:"Fatboy Slim",           year:1998, genre:'electronic', decade:'1990s', difficulty:1, deezerQuery:"Fatboy Slim Praise You" },
  { id:560, title:"The Rockafeller Skank",     artist:"Fatboy Slim",           year:1998, genre:'electronic', decade:'1990s', difficulty:1, deezerQuery:"Fatboy Slim The Rockafeller Skank" },
  { id:561, title:"Insomnia",                  artist:"Faithless",             year:1995, genre:'electronic', decade:'1990s', difficulty:1, deezerQuery:"Faithless Insomnia" },
  { id:562, title:"Teardrop",                  artist:"Massive Attack",        year:1998, genre:'electronic', decade:'1990s', difficulty:2, deezerQuery:"Massive Attack Teardrop" },
  { id:563, title:"Oxygene Part 4",            artist:"Jean-Michel Jarre",     year:1976, genre:'electronic', decade:'1970s', difficulty:1, deezerQuery:"Jean Michel Jarre Oxygene Part 4" },
  { id:564, title:"Midnight City",             artist:"M83",                   year:2011, genre:'electronic', decade:'2010s', difficulty:1, deezerQuery:"M83 Midnight City" },
  { id:565, title:"Clarity",                   artist:"Zedd",                  year:2012, genre:'electronic', decade:'2010s', difficulty:1, deezerQuery:"Zedd Clarity" },
  { id:566, title:"Roses",                     artist:"The Chainsmokers",      year:2015, genre:'electronic', decade:'2010s', difficulty:1, deezerQuery:"The Chainsmokers Roses" },
  { id:567, title:"Titanium",                  artist:"David Guetta ft. Sia",  year:2011, genre:'electronic', decade:'2010s', difficulty:1, deezerQuery:"David Guetta Sia Titanium" },
  { id:568, title:"Where Are Ü Now",           artist:"Jack Ü ft. Justin Bieber",year:2015,genre:'electronic',decade:'2010s',difficulty:1, deezerQuery:"Jack U Justin Bieber Where Are U Now" },
  { id:569, title:"Lean On",                   artist:"Major Lazer",           year:2015, genre:'electronic', decade:'2010s', difficulty:1, deezerQuery:"Major Lazer Lean On" },
  { id:570, title:"Don't You Worry Child",     artist:"Swedish House Mafia",   year:2012, genre:'electronic', decade:'2010s', difficulty:1, deezerQuery:"Swedish House Mafia Don't You Worry Child" },

  // ══════════════════════════════════════════════════════
  // HIP-HOP / RAP — CLASSIQUES MANQUANTS
  // ══════════════════════════════════════════════════════
  { id:571, title:"California Love",           artist:"2Pac ft. Dr. Dre",      year:1995, genre:'hiphop',     decade:'1990s', difficulty:1, deezerQuery:"2Pac California Love" },
  { id:572, title:"Changes",                   artist:"2Pac",                  year:1998, genre:'hiphop',     decade:'1990s', difficulty:1, deezerQuery:"2Pac Changes" },
  { id:573, title:"Juicy",                     artist:"The Notorious B.I.G.",  year:1994, genre:'hiphop',     decade:'1990s', difficulty:1, deezerQuery:"Notorious BIG Juicy" },
  { id:574, title:"Mo Money Mo Problems",      artist:"The Notorious B.I.G.",  year:1997, genre:'hiphop',     decade:'1990s', difficulty:1, deezerQuery:"Notorious BIG Mo Money Mo Problems" },
  { id:575, title:"Empire State of Mind",      artist:"Jay-Z ft. Alicia Keys", year:2009, genre:'hiphop',     decade:'2000s', difficulty:1, deezerQuery:"Jay-Z Alicia Keys Empire State of Mind" },
  { id:576, title:"99 Problems",               artist:"Jay-Z",                 year:2003, genre:'hiphop',     decade:'2000s', difficulty:2, deezerQuery:"Jay-Z 99 Problems" },
  { id:577, title:"Nuthin' But a G Thang",     artist:"Dr. Dre",               year:1992, genre:'hiphop',     decade:'1990s', difficulty:2, deezerQuery:"Dr Dre Nuthin But a G Thang" },
  { id:578, title:"Sicko Mode",                artist:"Travis Scott",          year:2018, genre:'hiphop',     decade:'2010s', difficulty:1, deezerQuery:"Travis Scott Sicko Mode" },
  { id:579, title:"Rockstar",                  artist:"Post Malone",           year:2017, genre:'hiphop',     decade:'2010s', difficulty:1, deezerQuery:"Post Malone Rockstar" },
  { id:580, title:"Sunflower",                 artist:"Post Malone",           year:2018, genre:'hiphop',     decade:'2010s', difficulty:1, deezerQuery:"Post Malone Sunflower" },
  { id:581, title:"HUMBLE.",                   artist:"Kendrick Lamar",        year:2017, genre:'hiphop',     decade:'2010s', difficulty:2, deezerQuery:"Kendrick Lamar HUMBLE" },
  { id:582, title:"Industry Baby",             artist:"Lil Nas X",             year:2021, genre:'hiphop',     decade:'2020s', difficulty:1, deezerQuery:"Lil Nas X Industry Baby" },
  { id:583, title:"Rich Flex",                 artist:"Drake & 21 Savage",     year:2022, genre:'hiphop',     decade:'2020s', difficulty:1, deezerQuery:"Drake 21 Savage Rich Flex" },
  { id:584, title:"Mask Off",                  artist:"Future",                year:2017, genre:'hiphop',     decade:'2010s', difficulty:2, deezerQuery:"Future Mask Off" },

  // ══════════════════════════════════════════════════════
  // R&B MODERNE — RENFORTS
  // ══════════════════════════════════════════════════════
  { id:585, title:"Irreplaceable",             artist:"Beyoncé",               year:2006, genre:'rnb',        decade:'2000s', difficulty:1, deezerQuery:"Beyoncé Irreplaceable" },
  { id:586, title:"Love On Top",               artist:"Beyoncé",               year:2011, genre:'rnb',        decade:'2010s', difficulty:1, deezerQuery:"Beyoncé Love On Top" },
  { id:587, title:"Halo",                      artist:"Beyoncé",               year:2008, genre:'rnb',        decade:'2000s', difficulty:1, deezerQuery:"Beyoncé Halo" },
  { id:588, title:"U Got It Bad",              artist:"Usher",                 year:2001, genre:'rnb',        decade:'2000s', difficulty:1, deezerQuery:"Usher U Got It Bad" },
  { id:589, title:"We Found Love",             artist:"Rihanna ft. Calvin Harris",year:2011,genre:'rnb',      decade:'2010s', difficulty:1, deezerQuery:"Rihanna Calvin Harris We Found Love" },
  { id:590, title:"Diamonds",                  artist:"Rihanna",               year:2012, genre:'rnb',        decade:'2010s', difficulty:1, deezerQuery:"Rihanna Diamonds" },
  { id:591, title:"Starboy",                   artist:"The Weeknd",            year:2016, genre:'rnb',        decade:'2010s', difficulty:1, deezerQuery:"The Weeknd Starboy" },
  { id:592, title:"Earned It",                 artist:"The Weeknd",            year:2015, genre:'rnb',        decade:'2010s', difficulty:2, deezerQuery:"The Weeknd Earned It" },
  { id:593, title:"Waterfall",                 artist:"TLC",                   year:1994, genre:'rnb',        decade:'1990s', difficulty:2, deezerQuery:"TLC Waterfalls" },
  { id:594, title:"Thank U, Next",             artist:"Ariana Grande",         year:2018, genre:'pop',        decade:'2010s', difficulty:1, deezerQuery:"Ariana Grande thank u next" },
  { id:595, title:"7 Rings",                   artist:"Ariana Grande",         year:2019, genre:'pop',        decade:'2010s', difficulty:1, deezerQuery:"Ariana Grande 7 rings" },

  // ══════════════════════════════════════════════════════
  // REGGAE — RENFORTS
  // ══════════════════════════════════════════════════════
  { id:596, title:"Pressure Drop",             artist:"Toots and the Maytals", year:1969, genre:'reggae',     decade:'1960s', difficulty:2, deezerQuery:"Toots Maytals Pressure Drop" },
  { id:597, title:"Israelites",                artist:"Desmond Dekker",        year:1968, genre:'reggae',     decade:'1960s', difficulty:2, deezerQuery:"Desmond Dekker Israelites" },
  { id:598, title:"Electric Avenue",           artist:"Eddy Grant",            year:1982, genre:'reggae',     decade:'1980s', difficulty:1, deezerQuery:"Eddy Grant Electric Avenue" },
  { id:599, title:"Sunshine Reggae",           artist:"Laid Back",             year:1983, genre:'reggae',     decade:'1980s', difficulty:1, deezerQuery:"Laid Back Sunshine Reggae" },
  { id:600, title:"Informer",                  artist:"Snow",                  year:1992, genre:'reggae',     decade:'1990s', difficulty:1, deezerQuery:"Snow Informer" },
  { id:601, title:"Murderer",                  artist:"Barrington Levy",       year:1979, genre:'reggae',     decade:'1970s', difficulty:3, deezerQuery:"Barrington Levy Murderer" },

  // ══════════════════════════════════════════════════════
  // VARIÉTÉ INTERNATIONALE
  // ══════════════════════════════════════════════════════
  { id:602, title:"Despacito",                 artist:"Luis Fonsi ft. Daddy Yankee",year:2017,genre:'variete',decade:'2010s',difficulty:1, deezerQuery:"Luis Fonsi Despacito" },
  { id:603, title:"Hips Don't Lie",            artist:"Shakira",               year:2005, genre:'variete',    decade:'2000s', difficulty:1, deezerQuery:"Shakira Hips Don't Lie" },
  { id:604, title:"Waka Waka",                 artist:"Shakira",               year:2010, genre:'variete',    decade:'2010s', difficulty:1, deezerQuery:"Shakira Waka Waka" },
  { id:605, title:"Macarena",                  artist:"Los Del Rio",           year:1995, genre:'variete',    decade:'1990s', difficulty:1, deezerQuery:"Los Del Rio Macarena" },
  { id:606, title:"Con Calma",                 artist:"Daddy Yankee",          year:2019, genre:'variete',    decade:'2010s', difficulty:2, deezerQuery:"Daddy Yankee Con Calma" },
  { id:607, title:"Gangnam Style",             artist:"PSY",                   year:2012, genre:'variete',    decade:'2010s', difficulty:1, deezerQuery:"PSY Gangnam Style" },
  { id:608, title:"99 Luftballons",            artist:"Nena",                  year:1983, genre:'variete',    decade:'1980s', difficulty:1, deezerQuery:"Nena 99 Luftballons" },
  { id:609, title:"Major Tom",                 artist:"Peter Schilling",       year:1983, genre:'variete',    decade:'1980s', difficulty:2, deezerQuery:"Peter Schilling Major Tom" },
  { id:610, title:"Rock Me Amadeus",           artist:"Falco",                 year:1985, genre:'variete',    decade:'1980s', difficulty:1, deezerQuery:"Falco Rock Me Amadeus" },
  { id:611, title:"Vienna Calling",            artist:"Falco",                 year:1985, genre:'variete',    decade:'1980s', difficulty:2, deezerQuery:"Falco Vienna Calling" },
  { id:612, title:"Azzurro",                   artist:"Adriano Celentano",     year:1968, genre:'variete',    decade:'1960s', difficulty:2, deezerQuery:"Adriano Celentano Azzurro" },
  { id:613, title:"Volare",                    artist:"Domenico Modugno",      year:1958, genre:'variete',    decade:'1950s', difficulty:1, deezerQuery:"Domenico Modugno Volare Nel blu dipinto di blu" },
  { id:614, title:"Le temps des fleurs",       artist:"Dalida",                year:1968, genre:'variete',    decade:'1960s', difficulty:1, deezerQuery:"Dalida Le temps des fleurs" },
  { id:615, title:"Gigi l'Amoroso",            artist:"Dalida",                year:1974, genre:'variete',    decade:'1970s', difficulty:1, deezerQuery:"Dalida Gigi l Amoroso" },
  { id:616, title:"Laissez-moi danser",        artist:"Dalida",                year:1979, genre:'variete',    decade:'1970s', difficulty:1, deezerQuery:"Dalida Laissez moi danser" },
  { id:617, title:"Et maintenant",             artist:"Gilbert Bécaud",        year:1961, genre:'variete',    decade:'1960s', difficulty:2, deezerQuery:"Gilbert Becaud Et maintenant" },
  { id:618, title:"Nathalie",                  artist:"Gilbert Bécaud",        year:1964, genre:'variete',    decade:'1960s', difficulty:1, deezerQuery:"Gilbert Becaud Nathalie" },
  { id:619, title:"Besoin de rien, envie de toi","artist":"Peter & Sloane",    year:1985, genre:'variete',    decade:'1980s', difficulty:2, deezerQuery:"Peter Sloane Besoin de rien envie de toi" },
  { id:620, title:"Rimes",                     artist:"Michel Sardou",         year:1974, genre:'variete',    decade:'1970s', difficulty:2, deezerQuery:"Michel Sardou Je vais t aimer" },

  // ══════════════════════════════════════════════════════
  // POP 2010s / 2020s — RENFORTS
  // ══════════════════════════════════════════════════════
  { id:621, title:"Watermelon Sugar",          artist:"Harry Styles",          year:2019, genre:'pop',        decade:'2020s', difficulty:1, deezerQuery:"Harry Styles Watermelon Sugar" },
  { id:622, title:"Physical",                  artist:"Dua Lipa",              year:2020, genre:'pop',        decade:'2020s', difficulty:1, deezerQuery:"Dua Lipa Physical" },
  { id:623, title:"Into You",                  artist:"Ariana Grande",         year:2016, genre:'pop',        decade:'2010s', difficulty:1, deezerQuery:"Ariana Grande Into You" },
  { id:624, title:"One Dance",                 artist:"Drake",                 year:2016, genre:'pop',        decade:'2010s', difficulty:1, deezerQuery:"Drake One Dance" },
  { id:625, title:"Perfect",                   artist:"Ed Sheeran",            year:2017, genre:'pop',        decade:'2010s', difficulty:1, deezerQuery:"Ed Sheeran Perfect" },
  { id:626, title:"Señorita",                  artist:"Shawn Mendes & Camila Cabello",year:2019,genre:'pop',  decade:'2010s', difficulty:1, deezerQuery:"Shawn Mendes Camila Cabello Senorita" },
  { id:627, title:"Golden Hour",               artist:"JVKE",                  year:2022, genre:'pop',        decade:'2020s', difficulty:2, deezerQuery:"JVKE Golden Hour" },
  { id:628, title:"Lose You to Love Me",       artist:"Selena Gomez",          year:2019, genre:'pop',        decade:'2010s', difficulty:1, deezerQuery:"Selena Gomez Lose You to Love Me" },
  { id:629, title:"Stitches",                  artist:"Shawn Mendes",          year:2015, genre:'pop',        decade:'2010s', difficulty:1, deezerQuery:"Shawn Mendes Stitches" },
  { id:630, title:"Circles",                   artist:"Post Malone",           year:2019, genre:'pop',        decade:'2010s', difficulty:1, deezerQuery:"Post Malone Circles" },

  // ══════════════════════════════════════════════════════
  // POP — 2020s (TAYLOR SWIFT / OLIVIA RODRIGO / HARRY STYLES…)
  // ══════════════════════════════════════════════════════
  { id:631, title:"cardigan",                  artist:"Taylor Swift",          year:2020, genre:'pop',        decade:'2020s', difficulty:2, deezerQuery:"Taylor Swift cardigan" },
  { id:632, title:"willow",                    artist:"Taylor Swift",          year:2020, genre:'pop',        decade:'2020s', difficulty:2, deezerQuery:"Taylor Swift willow" },
  { id:633, title:"Anti-Hero",                 artist:"Taylor Swift",          year:2022, genre:'pop',        decade:'2020s', difficulty:1, deezerQuery:"Taylor Swift Anti-Hero" },
  { id:634, title:"Lavender Haze",             artist:"Taylor Swift",          year:2022, genre:'pop',        decade:'2020s', difficulty:1, deezerQuery:"Taylor Swift Lavender Haze" },
  { id:635, title:"Cruel Summer",              artist:"Taylor Swift",          year:2019, genre:'pop',        decade:'2020s', difficulty:1, deezerQuery:"Taylor Swift Cruel Summer" },
  { id:636, title:"drivers license",           artist:"Olivia Rodrigo",        year:2021, genre:'pop',        decade:'2020s', difficulty:1, deezerQuery:"Olivia Rodrigo drivers license" },
  { id:637, title:"good 4 u",                  artist:"Olivia Rodrigo",        year:2021, genre:'pop',        decade:'2020s', difficulty:1, deezerQuery:"Olivia Rodrigo good 4 u" },
  { id:638, title:"brutal",                    artist:"Olivia Rodrigo",        year:2021, genre:'pop',        decade:'2020s', difficulty:2, deezerQuery:"Olivia Rodrigo brutal" },
  { id:639, title:"vampire",                   artist:"Olivia Rodrigo",        year:2023, genre:'pop',        decade:'2020s', difficulty:1, deezerQuery:"Olivia Rodrigo vampire" },
  { id:640, title:"As It Was",                 artist:"Harry Styles",          year:2022, genre:'pop',        decade:'2020s', difficulty:1, deezerQuery:"Harry Styles As It Was" },
  { id:641, title:"Late Night Talking",        artist:"Harry Styles",          year:2022, genre:'pop',        decade:'2020s', difficulty:2, deezerQuery:"Harry Styles Late Night Talking" },
  { id:642, title:"Easy On Me",                artist:"Adele",                 year:2021, genre:'pop',        decade:'2020s', difficulty:1, deezerQuery:"Adele Easy On Me" },
  { id:643, title:"Flowers",                   artist:"Miley Cyrus",           year:2023, genre:'pop',        decade:'2020s', difficulty:1, deezerQuery:"Miley Cyrus Flowers" },
  { id:644, title:"Prisoner",                  artist:"Miley Cyrus ft. Dua Lipa",year:2020,genre:'pop',       decade:'2020s', difficulty:2, deezerQuery:"Miley Cyrus Dua Lipa Prisoner" },
  { id:645, title:"About Damn Time",           artist:"Lizzo",                 year:2022, genre:'pop',        decade:'2020s', difficulty:1, deezerQuery:"Lizzo About Damn Time" },
  { id:646, title:"Heat Waves",                artist:"Glass Animals",         year:2020, genre:'pop',        decade:'2020s', difficulty:1, deezerQuery:"Glass Animals Heat Waves" },
  { id:647, title:"STAY",                      artist:"The Kid LAROI & Justin Bieber",year:2021,genre:'pop',  decade:'2020s', difficulty:1, deezerQuery:"The Kid LAROI Justin Bieber STAY" },
  { id:648, title:"Peaches",                   artist:"Justin Bieber ft. Daniel Caesar",year:2021,genre:'pop',decade:'2020s',difficulty:1, deezerQuery:"Justin Bieber Peaches" },
  { id:649, title:"What Was I Made For?",      artist:"Billie Eilish",         year:2023, genre:'pop',        decade:'2020s', difficulty:1, deezerQuery:"Billie Eilish What Was I Made For" },
  { id:650, title:"Happier Than Ever",         artist:"Billie Eilish",         year:2021, genre:'pop',        decade:'2020s', difficulty:2, deezerQuery:"Billie Eilish Happier Than Ever" },
  { id:651, title:"Beautiful Things",          artist:"Benson Boone",          year:2024, genre:'pop',        decade:'2020s', difficulty:1, deezerQuery:"Benson Boone Beautiful Things" },
  { id:652, title:"Daylight",                  artist:"David Kushner",         year:2023, genre:'pop',        decade:'2020s', difficulty:1, deezerQuery:"David Kushner Daylight" },
  { id:653, title:"Espresso",                  artist:"Sabrina Carpenter",     year:2024, genre:'pop',        decade:'2020s', difficulty:1, deezerQuery:"Sabrina Carpenter Espresso" },
  { id:654, title:"Please Please Please",      artist:"Sabrina Carpenter",     year:2024, genre:'pop',        decade:'2020s', difficulty:1, deezerQuery:"Sabrina Carpenter Please Please Please" },
  { id:655, title:"Birds of a Feather",        artist:"Billie Eilish",         year:2024, genre:'pop',        decade:'2020s', difficulty:1, deezerQuery:"Billie Eilish Birds of a Feather" },
  { id:656, title:"Fortnight",                 artist:"Taylor Swift ft. Post Malone",year:2024,genre:'pop',   decade:'2020s', difficulty:1, deezerQuery:"Taylor Swift Post Malone Fortnight" },
  { id:657, title:"I Had Some Help",           artist:"Post Malone ft. Morgan Wallen",year:2024,genre:'pop',  decade:'2020s', difficulty:1, deezerQuery:"Post Malone Morgan Wallen I Had Some Help" },

  // ══════════════════════════════════════════════════════
  // R&B / SOUL — 2020s
  // ══════════════════════════════════════════════════════
  { id:658, title:"Leave the Door Open",       artist:"Silk Sonic",            year:2021, genre:'rnb',        decade:'2020s', difficulty:1, deezerQuery:"Silk Sonic Leave the Door Open" },
  { id:659, title:"Smoking Out the Window",    artist:"Silk Sonic",            year:2021, genre:'rnb',        decade:'2020s', difficulty:2, deezerQuery:"Silk Sonic Smoking Out the Window" },
  { id:660, title:"Kill Bill",                 artist:"SZA",                   year:2022, genre:'rnb',        decade:'2020s', difficulty:1, deezerQuery:"SZA Kill Bill" },
  { id:661, title:"Snooze",                    artist:"SZA",                   year:2022, genre:'rnb',        decade:'2020s', difficulty:2, deezerQuery:"SZA Snooze" },
  { id:662, title:"Unholy",                    artist:"Sam Smith & Kim Petras",year:2022, genre:'rnb',        decade:'2020s', difficulty:1, deezerQuery:"Sam Smith Kim Petras Unholy" },
  { id:663, title:"Die For You",               artist:"The Weeknd",            year:2022, genre:'rnb',        decade:'2020s', difficulty:1, deezerQuery:"The Weeknd Die For You" },
  { id:664, title:"Calm Down",                 artist:"Rema & Selena Gomez",   year:2022, genre:'rnb',        decade:'2020s', difficulty:1, deezerQuery:"Rema Selena Gomez Calm Down" },
  { id:665, title:"Essence",                   artist:"Wizkid ft. Tems",       year:2021, genre:'rnb',        decade:'2020s', difficulty:2, deezerQuery:"Wizkid Tems Essence" },
  { id:666, title:"Bad Habit",                 artist:"Steve Lacy",            year:2022, genre:'rnb',        decade:'2020s', difficulty:1, deezerQuery:"Steve Lacy Bad Habit" },
  { id:667, title:"Shirt",                     artist:"SZA",                   year:2022, genre:'rnb',        decade:'2020s', difficulty:3, deezerQuery:"SZA Shirt" },
  { id:668, title:"Creepin'",                  artist:"Metro Boomin ft. The Weeknd",year:2022,genre:'rnb',    decade:'2020s', difficulty:2, deezerQuery:"Metro Boomin The Weeknd Creepin" },
  { id:669, title:"Blinding Lights",           artist:"The Weeknd",            year:2020, genre:'rnb',        decade:'2020s', difficulty:1, deezerQuery:"The Weeknd Blinding Lights" },
  { id:670, title:"Save Your Tears",           artist:"The Weeknd",            year:2020, genre:'rnb',        decade:'2020s', difficulty:1, deezerQuery:"The Weeknd Save Your Tears" },
  { id:671, title:"Paint The Town Red",        artist:"Doja Cat",              year:2023, genre:'hiphop',     decade:'2020s', difficulty:1, deezerQuery:"Doja Cat Paint The Town Red" },
  { id:672, title:"Say So",                    artist:"Doja Cat",              year:2020, genre:'hiphop',     decade:'2020s', difficulty:1, deezerQuery:"Doja Cat Say So" },

  // ══════════════════════════════════════════════════════
  // HIP-HOP — 2020s
  // ══════════════════════════════════════════════════════
  { id:673, title:"First Class",               artist:"Jack Harlow",           year:2022, genre:'hiphop',     decade:'2020s', difficulty:1, deezerQuery:"Jack Harlow First Class" },
  { id:674, title:"fukumean",                  artist:"Gunna",                 year:2023, genre:'hiphop',     decade:'2020s', difficulty:2, deezerQuery:"Gunna fukumean" },
  { id:675, title:"Rich Baby Daddy",           artist:"Drake ft. Sexyy Red",   year:2023, genre:'hiphop',     decade:'2020s', difficulty:2, deezerQuery:"Drake Sexyy Red Rich Baby Daddy" },
  { id:676, title:"MONTERO (Call Me By Your Name)","artist":"Lil Nas X",       year:2021, genre:'hiphop',     decade:'2020s', difficulty:1, deezerQuery:"Lil Nas X MONTERO Call Me By Your Name" },
  { id:677, title:"family ties",               artist:"Baby Keem & Kendrick Lamar",year:2021,genre:'hiphop',  decade:'2020s', difficulty:3, deezerQuery:"Baby Keem Kendrick Lamar family ties" },
  { id:678, title:"Not Like Us",               artist:"Kendrick Lamar",        year:2024, genre:'hiphop',     decade:'2020s', difficulty:1, deezerQuery:"Kendrick Lamar Not Like Us" },
  { id:679, title:"Luther",                    artist:"Kendrick Lamar & SZA",  year:2024, genre:'hiphop',     decade:'2020s', difficulty:1, deezerQuery:"Kendrick Lamar SZA Luther" },

  // ══════════════════════════════════════════════════════
  // LATIN — 2020s (BAD BUNNY / KAROL G / BIZARRAP…)
  // ══════════════════════════════════════════════════════
  { id:680, title:"DÁKITI",                    artist:"Bad Bunny & Jhay Cortez",year:2020, genre:'variete',   decade:'2020s', difficulty:2, deezerQuery:"Bad Bunny Jhay Cortez DAKITI" },
  { id:681, title:"Yonaguni",                  artist:"Bad Bunny",             year:2021, genre:'variete',    decade:'2020s', difficulty:2, deezerQuery:"Bad Bunny Yonaguni" },
  { id:682, title:"Tití Me Preguntó",          artist:"Bad Bunny",             year:2022, genre:'variete',    decade:'2020s', difficulty:1, deezerQuery:"Bad Bunny Titi Me Pregunto" },
  { id:683, title:"Me Porto Bonito",           artist:"Bad Bunny ft. Chencho Corleone",year:2022,genre:'variete',decade:'2020s',difficulty:1, deezerQuery:"Bad Bunny Chencho Corleone Me Porto Bonito" },
  { id:684, title:"Bichota",                   artist:"Karol G",               year:2020, genre:'variete',    decade:'2020s', difficulty:1, deezerQuery:"Karol G Bichota" },
  { id:685, title:"Provenza",                  artist:"Karol G",               year:2022, genre:'variete',    decade:'2020s', difficulty:1, deezerQuery:"Karol G Provenza" },
  { id:686, title:"TQG",                       artist:"Karol G & Shakira",     year:2023, genre:'variete',    decade:'2020s', difficulty:1, deezerQuery:"Karol G Shakira TQG" },
  { id:687, title:"Quevedo: Bzrp Music Session Vol. 52","artist":"Bizarrap & Quevedo",year:2022,genre:'variete',decade:'2020s',difficulty:1, deezerQuery:"Bizarrap Quevedo Music Session 52" },
  { id:688, title:"Shakira: Bzrp Music Session Vol. 53","artist":"Bizarrap & Shakira",year:2023,genre:'variete',decade:'2020s',difficulty:1, deezerQuery:"Bizarrap Shakira Music Session 53" },
  { id:689, title:"Ella Baila Sola",           artist:"Eslabon Armado & Peso Pluma",year:2023,genre:'variete',decade:'2020s',difficulty:2, deezerQuery:"Eslabon Armado Peso Pluma Ella Baila Sola" },
  { id:690, title:"Hawái",                     artist:"Maluma",                year:2020, genre:'variete',    decade:'2020s', difficulty:1, deezerQuery:"Maluma Hawai" },
  { id:691, title:"La Fama",                   artist:"Rosalía ft. The Weeknd",year:2021, genre:'variete',    decade:'2020s', difficulty:2, deezerQuery:"Rosalia The Weeknd La Fama" },

  // ══════════════════════════════════════════════════════
  // CHANSON FRANÇAISE — 2020s (STROMAE / ORELSAN / AYA NAKAMURA…)
  // ══════════════════════════════════════════════════════
  { id:692, title:"L'Enfer",                   artist:"Stromae",               year:2022, genre:'french',     decade:'2020s', difficulty:1, deezerQuery:"Stromae L Enfer" },
  { id:693, title:"Fils de joie",              artist:"Stromae",               year:2022, genre:'french',     decade:'2020s', difficulty:2, deezerQuery:"Stromae Fils de joie" },
  { id:694, title:"La solassitude",            artist:"Stromae",               year:2022, genre:'french',     decade:'2020s', difficulty:2, deezerQuery:"Stromae La solassitude" },
  { id:695, title:"Ma meilleure ennemie",      artist:"Stromae ft. Pomme",     year:2022, genre:'french',     decade:'2020s', difficulty:2, deezerQuery:"Stromae Pomme Ma meilleure ennemie" },
  { id:696, title:"Tout va bien",              artist:"Orelsan",               year:2021, genre:'french',     decade:'2020s', difficulty:1, deezerQuery:"Orelsan Tout va bien" },
  { id:697, title:"L'odeur de l'essence",      artist:"Orelsan",               year:2021, genre:'french',     decade:'2020s', difficulty:2, deezerQuery:"Orelsan L odeur de l essence" },
  { id:698, title:"Civilisation",              artist:"Orelsan",               year:2021, genre:'french',     decade:'2020s', difficulty:2, deezerQuery:"Orelsan Civilisation" },
  { id:699, title:"Copines",                   artist:"Aya Nakamura",          year:2019, genre:'french',     decade:'2020s', difficulty:1, deezerQuery:"Aya Nakamura Copines" },
  { id:700, title:"Jogging",                   artist:"Aya Nakamura",          year:2021, genre:'french',     decade:'2020s', difficulty:1, deezerQuery:"Aya Nakamura Jogging" },
  { id:701, title:"Pookie",                    artist:"Aya Nakamura",          year:2021, genre:'french',     decade:'2020s', difficulty:1, deezerQuery:"Aya Nakamura Pookie" },
  { id:702, title:"Avant toi",                 artist:"Vitaa & Slimane",       year:2022, genre:'french',     decade:'2020s', difficulty:1, deezerQuery:"Vitaa Slimane Avant toi" },
  { id:703, title:"Bande organisée",           artist:"Jul",                   year:2020, genre:'french',     decade:'2020s', difficulty:1, deezerQuery:"Jul Bande organisee" },
  { id:704, title:"Chocolat",                  artist:"Roméo Elvis",           year:2020, genre:'french',     decade:'2020s', difficulty:2, deezerQuery:"Romeo Elvis Chocolat" },
  { id:705, title:"Coeur",                     artist:"Indochine",             year:2020, genre:'french',     decade:'2020s', difficulty:2, deezerQuery:"Indochine Coeur" },

  // ══════════════════════════════════════════════════════
  // K-POP — 2020s (BTS / BLACKPINK / JUNG KOOK…)
  // ══════════════════════════════════════════════════════
  { id:706, title:"Dynamite",                  artist:"BTS",                   year:2020, genre:'variete',    decade:'2020s', difficulty:1, deezerQuery:"BTS Dynamite" },
  { id:707, title:"Butter",                    artist:"BTS",                   year:2021, genre:'variete',    decade:'2020s', difficulty:1, deezerQuery:"BTS Butter" },
  { id:708, title:"Permission to Dance",       artist:"BTS",                   year:2021, genre:'variete',    decade:'2020s', difficulty:1, deezerQuery:"BTS Permission to Dance" },
  { id:709, title:"Pink Venom",                artist:"BLACKPINK",             year:2022, genre:'variete',    decade:'2020s', difficulty:1, deezerQuery:"BLACKPINK Pink Venom" },
  { id:710, title:"Shut Down",                 artist:"BLACKPINK",             year:2022, genre:'variete',    decade:'2020s', difficulty:2, deezerQuery:"BLACKPINK Shut Down" },
  { id:711, title:"Seven",                     artist:"Jung Kook",             year:2023, genre:'variete',    decade:'2020s', difficulty:1, deezerQuery:"Jung Kook Seven" },

  // ══════════════════════════════════════════════════════
  // ÉLECTRONIQUE / DANCE — 2020s
  // ══════════════════════════════════════════════════════
  { id:712, title:"I'm Good (Blue)",           artist:"David Guetta & Bebe Rexha",year:2022,genre:'electronic',decade:'2020s',difficulty:1, deezerQuery:"David Guetta Bebe Rexha I'm Good Blue" },
  { id:713, title:"One More Time (Voltage)",   artist:"Daft Punk",             year:2021, genre:'electronic', decade:'2020s', difficulty:2, deezerQuery:"Daft Punk One More Time" },
  { id:714, title:"Beggin'",                   artist:"Måneskin",              year:2021, genre:'rock',        decade:'2020s', difficulty:1, deezerQuery:"Maneskin Beggin" },
  { id:715, title:"Zitti e buoni",             artist:"Måneskin",              year:2021, genre:'rock',        decade:'2020s', difficulty:2, deezerQuery:"Maneskin Zitti e buoni" },
  { id:716, title:"Pepas",                     artist:"Farruko",               year:2021, genre:'electronic', decade:'2020s', difficulty:2, deezerQuery:"Farruko Pepas" },
  { id:717, title:"Unholy (Extended Mix)",     artist:"Sam Smith",             year:2022, genre:'electronic', decade:'2020s', difficulty:1, deezerQuery:"Sam Smith Unholy extended" },
  { id:718, title:"Tattoo",                    artist:"Loreen",                year:2023, genre:'pop',        decade:'2020s', difficulty:1, deezerQuery:"Loreen Tattoo" },
];

export const genreLabels: Record<string, string> = {
  jazz:       '🎷 Jazz',
  classique:  '🎻 Classique',
  blues:      '🎸 Blues',
  folk:       '🪕 Folk / Trad.',
  gospel:     '🙏 Gospel',
  trad:       '🎺 Traditionnelle',
  operette:   '🎭 Opéra / Opérette',
  rock:       '🎸 Rock',
  pop:        '🎤 Pop',
  reggae:     '🌿 Reggae',
  electronic: '🎛️ Électronique',
  hiphop:     '🎧 Hip-Hop',
  soul:       '🎵 Soul',
  disco:      '🪩 Disco',
  metal:      '🤘 Métal',
  french:     '🥐 Chanson française',
  funk:       '🕺 Funk',
  rnb:        '🎼 R&B',
  variete:    '🎶 Variété',
};

export const genreColors: Record<string, string> = {
  jazz:       '#f59e0b',
  classique:  '#d97706',
  blues:      '#1d4ed8',
  folk:       '#65a30d',
  gospel:     '#7c3aed',
  trad:       '#b45309',
  operette:   '#be185d',
  french:     '#3b82f6',
  rock:       '#ef4444',
  pop:        '#ec4899',
  reggae:     '#10b981',
  electronic: '#8b5cf6',
  hiphop:     '#f97316',
  soul:       '#eab308',
  disco:      '#a855f7',
  metal:      '#6b7280',
  funk:       '#14b8a6',
  rnb:        '#f43f5e',
};

export const decadeLabels: Record<string, string> = {
  '1940s': 'Années 40',
  '1950s': 'Années 50',
  '1960s': 'Années 60',
  '1970s': 'Années 70',
  '1980s': 'Années 80',
  '1990s': 'Années 90',
  '2000s': 'Années 2000',
  '2010s': 'Années 2010',
  '2020s': 'Années 2020',
};

export function getSongsByFilters(genres: string[], decades: string[], maxDiff: number): Song[] {
  return songs.filter(s =>
    (genres.length === 0 || genres.includes(s.genre)) &&
    (decades.length === 0 || decades.includes(s.decade)) &&
    s.difficulty <= maxDiff
  );
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Génère 4 options QCM : 1 correcte + 3 leurres plausibles */
export function generateOptions(correct: Song, pool: Song[]): string[] {
  const correctLabel = `${correct.title} — ${correct.artist}`;
  // Leurres préférés du même genre ou de la même décennie
  const similar = pool.filter(s => s.id !== correct.id && (s.genre === correct.genre || s.decade === correct.decade));
  const rest    = pool.filter(s => s.id !== correct.id && !similar.find(x => x.id === s.id));
  const candidates = shuffle([...similar, ...rest]);
  const wrongs = candidates.slice(0, 3).map(s => `${s.title} — ${s.artist}`);
  return shuffle([correctLabel, ...wrongs]);
}
