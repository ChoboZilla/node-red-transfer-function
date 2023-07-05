import numpy as np
import control
import sys

def cnvStr(s):
    """Convert string to either int or float."""
    try:
        ret = int(s)
    except ValueError:
        #Try float.
        ret = float(s)
    return ret

num = np.array ([cnvStr(sys.argv[4]), cnvStr(sys.argv[3]), cnvStr(sys.argv[2]), cnvStr(sys.argv[1])])
den = np.array ([cnvStr(sys.argv[8]), cnvStr(sys.argv[7]), cnvStr(sys.argv[6]), cnvStr(sys.argv[5])])

W = control.tf(num, den)




#To understand what you need to send see python.control.tf and python.control TransferFunction class documentation 
                                                                                           
#What you print with the print() function will be sent back to JS like string
print(W)
sys.stdout.flush()