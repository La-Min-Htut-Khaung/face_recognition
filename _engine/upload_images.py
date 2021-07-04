import os
import sys
import glob
import tkinter
from tkinter import filedialog
import cv2

name = sys.argv[1]
folder_path = "C:/Users/Technology and Trust/Desktop/Face App/_engine/dataset/" + name


# try:
#     os.mkdir(path)
# except OSError:
#     print ("Creation of direction %s failed % path")
# else:
#     print ("Successfully Created")



root = tkinter.Tk()
directory = tkinter.filedialog.askdirectory(parent=root,initialdir="/",title="Please select a directory")

print(directory)
path = directory+"\*.*"
for bb,file in enumerate (glob.glob(path)):
    print(bb)
    
     
    c= cv2.imread(file)
     
    cv2.imwrite(folder_path+'\{}.jpg'.format(bb),c)
    k =cv2.waitKey(1000)
    cv2.destroyAllWindows()
print("hello")
sys.stdout.flush()
