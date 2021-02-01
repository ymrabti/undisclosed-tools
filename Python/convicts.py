def generate(n):
    return list(range(1, n+1))



def lastHumanAlive(nombre):
    listComn=generate(nombre)
    i=0
    intialrnd=0
    while(len(listComn)>2):
        newnombre=len(listComn)
        round=i//newnombre
        listi=listComn[i%(newnombre)]
        listi1=listComn[(i+1)%(newnombre)]
        listi2=listComn[(i+2)%(newnombre)]
        if(round-intialrnd>0):
            print("round "+str(round))
        print(listComn)
        i+=1-round
        listComn.remove(listi1)
        print(listComn)
        print(str(listi )+"\t -> "+str(listi1) + "\t ==>>  "+ str(listi2) +" \t("+ str(len(listComn))+")\n")
        if(round-intialrnd>0):
            print("\n\n")
    vqr = (round+1)%2
    print("\n\nlast : "+str(listComn[vqr]))

lastHumanAlive(10)