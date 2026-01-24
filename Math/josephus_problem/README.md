##النص العربي

أراد ملكٌ أن يُعدم **N** سجينًا. فوضعهم في شكل دائري، ورقّمهم من 1 إلى **N**، ثم أعطى السيف للسجين رقم 1.
يقوم كل سجين بإعدام السجين الذي يليه مباشرة، ثم يُسلِّم السيف إلى السجين الحي الذي بعده، وهكذا دواليك، إلى أن يبقى سجين واحد على قيد الحياة.

**من هو السجين الذي سيبقى حيًّا؟**

ولنضف بعض اللمسات التشويقية:

* ماذا لو غيّرنا رقم السجين الذي تبدأ عنده اللعبة؟
* ماذا لو غيّرنا اتجاه اللعبة، بحيث يصبح التعداد تنازليًا بدلًا من تصاعدي داخل الدائرة؟
* ماذا لو جعلنا كل سجين يقتل **m** سجناء بدل سجين واحد في كل مرة؟

ولنجعل الأمور أكثر فوضوية قليلًا:

* ماذا لو منحنا كل سجين حرية الاختيار بين قتل السجين الذي يليه أو العفو عنه؟
  ستكون الأمور درامية؛ ففي جولة ما قد يجد السجين المُعفى عنه نفسه مضطرًا إلى قتل من عفا عنه… إن بقي حيًّا أصلًا.
* ماذا لو جعلنا كل سجين يقتل عددًا **عشوائيًا** من السجناء، في حدود عدد أقصاه **m**، على ألا يقل عن واحد؟

وماذا لو دمجنا كل هذه الاحتمالات معًا؟

إنها **معضلة جوزيفوس الفوضوية**.

---

## Français

Un roi décida d’exécuter **N** prisonniers. Il les disposa en cercle, les numérota de 1 à **N**, puis remit l’épée au prisonnier numéro 1.
Chaque prisonnier exécute alors le prisonnier qui le suit immédiatement, puis transmet l’épée au prisonnier vivant suivant, et ainsi de suite, jusqu’à ce qu’il n’en reste plus qu’un seul en vie.

**Quel est le prisonnier qui survivra ?**

Ajoutons maintenant quelques touches de suspense :

* Et si l’on changeait le numéro du prisonnier par lequel le jeu commence ?
* Et si l’on inversait le sens du jeu, en passant d’un sens croissant à un sens décroissant dans le cercle ?
* Et si chaque prisonnier devait tuer **m** prisonniers au lieu d’un seul à chaque tour ?

Rendons les choses un peu plus chaotiques :

* Et si l’on donnait à chaque prisonnier la liberté de tuer ou d’épargner le prisonnier suivant ?
  La situation deviendrait dramatique, car à un moment donné, le prisonnier épargné pourrait être contraint de tuer celui qui lui a fait grâce… s’il survit jusque-là.
* Et si chaque prisonnier tuait un nombre **aléatoire** de prisonniers, compris entre 1 et **m** ?

Et que se passerait-il si nous combinions toutes ces hypothèses ?

C’est le **problème de Josephus chaotique**.

---

## English

A king decided to execute **N** prisoners. He arranged them in a circle, numbered them from 1 to **N**, and handed the sword to prisoner number 1.
Each prisoner executes the prisoner immediately after him, then passes the sword to the next living prisoner, and so on, until only one prisoner remains alive.

**Which prisoner will survive?**

Now, let us add some suspense:

* What if we change the prisoner with whom the game starts?
* What if we reverse the direction of the game, moving counterclockwise instead of clockwise around the circle?
* What if each prisoner kills **m** prisoners instead of just one each time?

Let us make things even more chaotic:

* What if each prisoner is given the freedom to either kill or spare the next prisoner?
  The situation would become dramatic, as at some point the spared prisoner might be forced to kill the one who spared him—if he survives at all.
* What if each prisoner kills a **random** number of prisoners, between 1 and **m**?

And what if we combined all these possibilities together?

This is the **Chaotic Josephus Problem**.

