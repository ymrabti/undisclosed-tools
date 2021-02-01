class Point(object):
    "Définition d'un point mathématique"
    def affiche_point(p):
        print ("coord. horizontale =", p.x, " , coord. verticale =", p.y)

    def distance(p,q):
        return math.sqrt((p.x-q.x)**2+(p.y-q.y)**2)


class Point3D(Point):
    "Définition d'un point mathématique 3D"

class Rectangle(object):
    "définition d'une classe de rectangles"
    def trouveCentre(box):
        p = Point()
        p.x = box.coin.x + box.largeur/2.0
        p.y = box.coin.y + box.hauteur/2.0
        return p


class Time(object):
    "Définition d'une classe temporelle"
    def __init__(self):
        self.heure =0
        self.minute =0
        self.seconde =0
    def __init__(self, hh =0, mm =0, ss =0):
        self.heure = hh
        self.minute = mm
        self.seconde = ss
    def affiche_heure(self):
        print ("Le temps c'est ; %s:%s:%s" % (self.heure, self.minute, self.seconde))



def affiche_heure(t):
    print ("Time is        ; %s:%s:%s" % (t.heure, t.minute, t.seconde))
instant = Time()
# instant.heure = 11
# instant.minute = 34
# instant.seconde = 25
#print(affiche_heure(instant))
affiche_heure(instant)
#Time.affiche_heure(instant)
instant.affiche_heure()

class Atome(object):
    """atomes simplifiés, choisis parmi les 10 premiers éléments du TP"""
    table =[None, ('hydrogène',0), ('hélium',2), ('lithium',4),
    ('béryllium',5), ('bore',6), ('carbone',6), ('azote',7),
    ('oxygène',8), ('fluor',10), ('néon',10)]
    def __init__(self, nat):
        "le n° atomique détermine le n. de protons, d'électrons et de neutrons"
        self.np, self.ne = nat, nat # nat = numéro atomique
        self.nn = Atome.table[nat][1] # nb. de neutrons trouvés dans table
    def affiche(self):
        print
        print ("Nom de l'élément :", Atome.table[self.np][0])
        print ("%s protons, %s électrons, %s neutrons" % (self.np, self.ne, self.nn))
class Ion(Atome):
    "les ions sont des atomes qui ont gagné ou perdu des électrons"
    def __init__(self, nat, charge):
        "le n° atomique et la charge électrique déterminent l'ion"
        Atome.__init__(self, nat)
        self.ne = self.ne - charge
        self.charge = charge
    def affiche(self):
        "cette méthode remplace celle héritée de la classe parente"
        Atome.affiche(self) # ... tout en l'utilisant elle-même !
        print ("Particule électrisée. Charge =", self.charge)
### Programme principal : ###
a1 = Atome(5)
a2 = Ion(3, 1)
a3 = Ion(8, -2)
a1.affiche()
a2.affiche()
a3.affiche()