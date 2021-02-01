resultSouhaitee='this code encrypt a message by method transposition.'
MyMessage='tdyebosohepsydpni ts  o.se amts nagericc etatorm hni'
mykey=7
def main0(ky,messg):
    if ky<len(messg)/2:
        # lines=math.ceil(len(messg)/ky)
        # matrix=['']*ky
        # difference=lines*ky-len(messg)
        # print(str(difference))
        # for k in range(ky+1):
        #     print(list(messg[k*ky:(k+1)*ky]))
        ciphertext=decryptMessage(ky,messg)
        print('key = '+str(ky)+' : ',end='')
        print('& message = '+messg)
        print('\t==> '+ ciphertext+'|')
        print('\n')
        return ciphertext
        return ''
    else:
        return 'cle doit superieur au demi de longuer de la chaine!'
    #pyperclip.copy()
def decryptMessage(key,message):
    lines=math.ceil(len(message)/key)
    difference=lines*key-len(message)
    plaintext=['']*lines
    col=0
    row=0
    for char in message:
        plaintext[col]+=char
        col+=1
        if (col==lines) or (col==lines-1 and row>=key-difference):
            col=0
            row+=1
    return ''.join(plaintext)

#if __name__=='__main__':
#print()
main0(mykey,MyMessage)