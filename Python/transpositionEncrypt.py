# import pyperclip.py
import math
MyMessage=input('votre message : ')
mykey=7
def main0(ky,messg):
    if ky<len(messg)/2:
        drawMtrxEnc(ky,messg)
        writeMsg(ky,messg)
        return encryptMessage(ky,messg)
    else:
        return 'cle doit superieur au demi de longuer de la chaine!'
    #pyperclip.copy()

################################## Encrypt Block #################################

def drawMtrxEnc(ky,messg):
    lines=math.ceil(len(messg)/ky)
    matrix=[[]]*ky
    for k in range(lines):
        print(list(messg[k*ky:(k+1)*ky]))

def writeMsg(ky,messg):
    print('key = '+str(ky)+' : ',end='')
    print('& message = '+messg)
    ciphertext=encryptMessage(ky,messg)
    print('\t==> '+ciphertext +'|')
    print('\n')

def encryptMessage(key,message):
    ciphertext=['']*key
    for col in range(key):
        pointer=col
        while pointer<len(message):
            ciphertext[col]+=message[pointer]
            pointer+=key
    return ''.join(ciphertext)

################################## Decrypt Block #################################
#if __name__=='__main__':
#print()
# main0(9,main0(4,main0(7,MyMessage)))

def drawMtrxDec(ky,messg):
    colonnes=math.ceil(len(messg)/ky)
    matrix=[[]]*ky
    for k in range(ky):
        print(list(messg[k*colonnes:(k+1)*colonnes]))


def writeMsgDec(ky,messg):
    print('key = '+str(ky)+' : ',end='')
    print('& crypted message = '+messg)
    ciphertext=decryptMessage(ky,messg)
    print('\t==> '+ciphertext +'|')
    print('\n')

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
    drawMtrxDec(key,message)
    return ''.join(plaintext)

##################################  #################################
writeMsgDec(mykey,main0(mykey,MyMessage))
