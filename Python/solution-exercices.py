from tkinter import *
from math import sin, cos
def move():
    global ang, x, y
    # on mémorise les coord. précédentes avant de calculer les nouvelles :
    xp, yp = x, y
    # rotation d'un angle de 0.1 radian :
    ang = ang +.1
    # sinus et cosinus de cet angle => coord. d'un point du cercle trigono.
    x, y = sin(ang), cos(ang)
    # Variante déterminant une courbe de Lissajous avec f1/f2 = 2/3 :
    # x, y = sin(2*ang), cos(3*ang)
    # mise à l'échelle (120 = rayon du cercle, (150,150) = centre du canevas)
    x, y = x*120 + 150, y*120 + 150
    can.coords(balle, x-10, y-10, x+10, y+10)
    can.create_line(xp, yp, x, y, fill ="blue")
ang, x, y = 0., 150., 270.
fen = Tk()
fen.title('Courbes de Lissajous')
can = Canvas(fen, width =300, height=300, bg="white")
can.pack()
balle = can.create_oval(x-10, y-10, x+10, y+10, fill='red')
Button(fen, text='Go', command =move).pack()
fen.mainloop()


# Chutes et rebonds
from tkinter import *
def move():
    global x, y, v, dx, dv, flag
    xp, yp = x, y # mémorisation des coord. précédentes
    # déplacement horizontal :
    if x > 385 or x < 15 : # rebond sur les parois latérales :
        dx = -dx # on inverse le déplacement
    x = x + dx
    # variation de la vitesse verticale (toujours vers le bas):
    v = v + dv
    # déplacement vertical (proportionnel à la vitesse)
    y = y + v
    if y > 240: # niveau du sol à 240 pixels :
        y = 240 # défense d'aller + loin !
        v = -v # rebond : la vitesse s'inverse
    # on repositionne la balle :
    can.coords(balle, x-10, y-10, x+10, y+10)
    # on trace un bout de trajectoire :
    can.create_line(xp, yp, x, y, fill ='light grey')
    # ... et on remet ça jusqu'à plus soif :
    if flag > 0:
        fen.after(50,move)
def start():
    global flag
    flag = flag +1
    if flag == 1:
        move()
def stop():
    global flag
    flag =0
# initialisation des coordonnées, des vitesses et du témoin d'animation :
x, y, v, dx, dv, flag = 15, 15, 0, 6, 5, 0
fen = Tk()
fen.title(' Chutes et rebonds')
can = Canvas(fen, width =400, height=250, bg="white")
can.pack()
balle = can.create_oval(x-10, y-10, x+10, y+10, fill='red')
Button(fen, text='Start', command =start).pack(side =LEFT, padx =10)
Button(fen, text='Stop', command =stop).pack(side =LEFT)
Button(fen, text='Quitter', command =fen.quit).pack(side =RIGHT, padx =10)
fen.mainloop()





from tkinter import *
# === Définition de quelques gestionnaires d'événements :
def start_it():
    "Démarrage de l'animation"
    global flag
    if flag ==0:
        flag =1
        move()

def stop_it():
    "Arrêt de l'animation"
    global flag
    flag =0


def animate_it_stop(event =None):
    "changer de l'animation"
    global flag
    if flag ==0:
        flag=1
        move()
    else:
        flag=0
        stop_it

def go_left(event =None):
    "délacement vers la gauche"
    global dx, dy
    dx, dy = -1, 0
def go_right(event =None):
    global dx, dy
    dx, dy = 1, 0
def go_up(event =None):
    "déplacement vers le haut"
    global dx, dy
    dx, dy = 0, -1
def go_down(event =None):
    global dx, dy
    dx, dy = 0, 1



def move():
    "Animation du serpent par récursivité"
    global flag
    # Principe du mouvement opéré : on déplace le carré de queue, dont les
    # caractéristiques sont mémorisées dans le premier élément de la liste
    # <serp>, de manière à l'amener en avant du carré de tête, dont les
    # caractéristiques sont mémorisées dans le dernier élément de la liste.
    # On définit ainsi un nouveau carré de tête pour le serpent, dont on
    # mémorise les caractéristiques en les ajoutant à la liste.
    # Il ne reste plus qu'à effacer alors le premier élément de la liste,
    # et ainsi de suite ... :
    c = serp[0] # extraction des infos concernant le carré de queue
    cq = c[0] # réf. de ce carré (coordonnées inutiles ici)
    l =len(serp) # longueur actuelle du serpent (= n. de carrés)
    c = serp[l-1] # extraction des infos concernant le carré de tête
    xt, yt = c[1], c[2] # coordonnées de ce carré
    # Préparation du déplacement proprement dit.
    # (cc est la taille du carré. dx & dy indiquent le sens du déplacement) :
    xq, yq = xt+dx*cc, yt+dy*cc # coord. du nouveau carré de tête
    # Vérification : a-t-on atteint les limites du canevas ? :
    if xq<0 or xq>canX-cc or yq<0 or yq>canY-cc:
        flag =0 # => arrêt de l'animation
        can.create_text(canX/2, 20, anchor =CENTER, text ="Perdu !!!",
        fill ="red", font="Arial 14 bold")
    can.coords(cq, xq, yq, xq+cc, yq+cc) # déplacement effectif
    serp.append([cq, xq, yq]) # mémorisation du nouveau carré de tête
    del(serp[0]) # effacement (retrait de la liste)
    # Appel récursif de la fonction par elle-même (=> boucle d'animation) :
    if flag >0:
        fen.after(50, move)
# === Programme principal : ========
# Variables globales modifiables par certaines fonctions :
flag =0 # commutateur pour l'animation
dx, dy = 1, 0 # indicateurs pour le sens du déplacement
# Autres variables globales :
canX, canY = 500, 500 # dimensions du canevas
x, y, cc = 100, 100, 15 # coordonnées et coté du premier carré
# Création de l'espace de jeu (fenêtre, canevas, boutons ...) :
fen =Tk()
can =Canvas(fen, bg ='dark gray', height =canX, width =canY)
can.pack(padx =10, pady =10)
bou1 =Button(fen, text="Start", width =10, command =start_it)
bou1.pack(side =LEFT)
bou2 =Button(fen, text="Stop", width =10, command =stop_it)
bou2.pack(side =LEFT)
# Association de gestionnaires d'événements aux touches fléchées du clavier :
fen.bind("<Left>", go_left) # Attention : les événements clavier
fen.bind("<Right>", go_right) # doivent toujours être associés à la
fen.bind("<Up>", go_up) # fenêtre principale, et non au canevas
fen.bind("<Down>", go_down) # ou à un autre widget.
fen.bind("<space>", animate_it_stop) # ou à un autre widget.
# Création du serpent initial (= ligne de 5 carrés).
# On mémorisera les infos concernant les carrés créés dans une liste de listes :
serp =[] # liste vide
# Création et mémorisation des 5 carrés : le dernier (à droite) est la tête.
i =0
while i <5:
    carre =can.create_rectangle(x, y, x+cc, y+cc, fill="green")
    # Pour chaque carré, on mémorise une petite sous-liste contenant
    # 3 éléments : la référence du carré et ses coordonnées de base :
    serp.append([carre, x, y])
    x =x+cc # le carré suivant sera un peu plus à droite
    i =i+1
fen.mainloop()




def sansDC(ch):
    "cette fonction renvoie la chaîne ch amputée de son dernier caractère"
    nouv = ""
    i, j = 0, len(ch) -1
    while i < j:
        nouv = nouv + ch[i]
        i = i + 1
    return nouv
def ecrireDansFichier():
    of = open(nomF, 'a')
    while 1:
        ligne = raw_input("entrez une ligne de texte (ou <Enter>) : ")
        if ligne == '':
            break
        else:
            of.write(ligne + '\n')
    of.close()
def lireDansFichier():
    of = open(nomF, 'r')
    while 1:
        ligne = of.readline()
        if ligne == "":
            break
        # afficher en omettant le dernier caractère (= fin de ligne) :
        print (sansDC(ligne))
    of.close()
nomF = input('Nom du fichier à traiter : ')
choix = input('Entrez "e" pour écrire, "c" pour consulter les données : ')
if choix =='e':
    ecrireDansFichier()
else:
    lireDansFichier()





