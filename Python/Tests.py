n=int(input('tapez nombre svp! '))
for i in range(0,n+1):
    for j in range(0,i):
        print('*',end='  ')
    print('\n')

n=12#int(input('tapez nombre svp! '))
for i in range(0,n):
    for k in range(0,n):
        if k<i:
            print(' ',end='  ')
        else:
            print('*',end='  ')
    print('\n')


print ('Veuillez entrer un nombre positif quelconque : ',)
nn = input()
print ('Le carré de', nn, 'vaut', nn**2)

prenom = input('Entrez votre prénom (entre guillemets) : ')
print ('Bonjour,', prenom)


from turtle import *
forward(120)
left(90)
color('red')
forward(80)



a=1
if a !=2:
    print ('perdu')
elif a ==3:
    print ('un instant, s.v.p.')
else :
    print ('gagné')

a=2
if a !=2:
    print ('perdu')
elif a ==3:
    print ('un instant, s.v.p.')
else :
    print ('gagné')

a=3
if a !=2:
    print ('perdu')
elif a ==3:
    print ('un instant, s.v.p.')
else :
    print ('gagné')

a=15
if a !=2:
    print ('perdu')
elif a ==3:
    print ('un instant, s.v.p.')
else :
    print ('gagné')


from turtle import *
def carre(taille, couleur):
    "fonction qui dessine un carré de taille et de couleur déterminées"
    color(couleur)
    c =0
    while c <4:
        forward(taille)
        right(90)
        c = c +1
carre(40,'#23a')


import Tkinter
fen1 = Tk()
txt1 = Label(fen1, text = 'Premier champ :')
txt2 = Label(fen1, text = 'Second :')
entr1 = Entry(fen1)
entr2 = Entry(fen1)
txt1.pack(side =LEFT)
txt2.pack(side =LEFT)
entr1.pack(side =RIGHT)
entr2.pack(side =RIGHT)
fen1.mainloop()



s = u"" # chaîne unicode vide
i = 945 # premier code
while i <= 969: # dernier code
    s += unichr(i)
    i = i + 1
    print ("Alphabet grec (minuscule) : ", s)




