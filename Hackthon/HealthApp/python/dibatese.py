#from django.shortcuts import render
import sys
import numpy as np  
import pandas as pd
#import pylab as pl

from sklearn.cluster import KMeans
from sklearn.decomposition import PCA
from sklearn.model_selection import KFold
from sklearn.model_selection import cross_val_score

from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
rfc=RandomForestClassifier()
lr=LogisticRegression()

from sklearn.model_selection import train_test_split

dia=pd.read_excel(r"C:\Users\LoveYouMaa\Desktop\study\diabetes.xlsx")

A=np.array(dia)

shape=A.shape
row=shape[0]
col=shape[1]

X=dia.iloc[:,:col-1]
y=dia.iloc[:,-1]

X=np.array(X)
y=np.array(y)

tree = DecisionTreeClassifier(random_state=50)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3)

xtrain=np.array(X_train)
ytrain=np.array(y_train)
xtest=np.array(X_test)
ytest=np.array(y_test)

tree.fit(xtrain,ytrain)

ypred=tree.predict(xtest)

# def home(request):
#     return render(request,'index.html')
p=[sys.argv[1],sys.argv[2],sys.argv[3],sys.argv[4],sys.argv[5],sys.argv[6],sys.argv[7],sys.argv[8]]
#p=[11,22,33,44,55,66,77,88]
p=np.array(p)
p=p.reshape(1,-1)
ans=tree.predict(p)
    
    
if(ans[0]==0):
    s="NO"
    print(s)
else:
    s="YES"
    print(s)
    # d={'val':s}
    # return render(request,'p_info.html',d)

#doc=pd.read_excel(r"C:\Users\Biswajit Satapathy\Desktop\study\doctor.xlsx")

# def doctor(request):
     
#     war=doc[['D_name','specialisation','phone']][doc['pin']==pin]
    
#     if(a>0):
#         res=doc[['D_name','specialisation','phone']][doc['specialisation']=='women']
#     elif(h<12):
#         res=doc[['D_name','specialisation','phone']][doc['specialisation']=='child']
#     else:
#         res=doc[['D_name','specialisation','phone']][doc['specialisation']=='general']

#     s1=res
#     dic={'res',s1}
#     return render(request,'p_info.html',dic)
