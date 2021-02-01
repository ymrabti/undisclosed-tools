class Rectangle:
    "Classe de rectangles"
    def __init__(self, longueur =30, largeur =15):
        self.L = longueur
        self.l = largeur
        self.nom ="rectangle"
    def perimetre(self):
        return ("(%s + %s) * 2 = %s" % (self.L, self.l,(self.L + self.l)*2))
    def surface(self):
        return ("%s * %s = %s" % (self.L, self.l, self.L*self.l))
    def mesures(self):
        print ("Un %s de %s sur %s" % (self.nom, self.L, self.l),end=' ')
        print ("a une surface de %s" % (self.surface(),),end=' ')
        print ("et un périmètre de %s\n" % (self.perimetre(),))
class Carre(Rectangle):
    "Classe de carrés"
    def __init__(self, cote =10):
        Rectangle.__init__(self, cote, cote)
        self.nom ="carré"
if __name__ == "__main__":
    r1 = Rectangle(15, 30)
    r1.mesures()
    c1 = Carre(13)
    c1.mesures()