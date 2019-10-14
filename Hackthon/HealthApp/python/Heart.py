#import all the necessory packages
import csv
import numpy as np  
import pandas as pd
import pylab as pl
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA
from sklearn.model_selection import KFold
from sklearn.model_selection import cross_val_score

heart=pd.read_excel(r"C:\Users\Biswajit Satapathy\Desktop\study\heart.xlsx")

A=np.array(heart)
heart

shape=A.shape
row=shape[0]
col=shape[1]

X=heart.iloc[:,:col-1]
y=heart.iloc[:,-1]

X=np.array(X)
y=np.array(y)


from sklearn.tree import DecisionTreeClassifier

tree = DecisionTreeClassifier(random_state=50)

from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
rfc=RandomForestClassifier()
lr=LogisticRegression()

from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3)

xtrain=np.array(X_train)
ytrain=np.array(y_train)
xtest=np.array(X_test)
ytest=np.array(y_test)

tree.fit(xtrain,ytrain)

ypred=tree.predict(xtest)

tree.score(xtest,ytest)

age=int(input("Age"))
sex=int(input("Sex"))          #1 for male 0 for female
cp=int(input("cp"))            #1,2,3
trestbps=int(input("trestbps"))
chol=int(input("cholestrol"))
fbs=int(input("fbs"))          #1 or 0
restecg=int(input("restecg"))  #1 or 0
thalach=int(input("thalach"))
exang=int(input("exang"))
oldpeak=int(input("oldpeak"))
slope=int(input("slope"))      #0,1,2
ca=int(input("ca"))            #0,1,2
thal=int(input("thal"))

p=[age,sex,cp,threstbps,chol,fbs,restecg,thalach,exang,oldpeak,slope,ca,thal]
p=np.array(p)
p=p.reshape(1,-1)
p

ans=tree.predict(p)
if(ans[0]==0):
    print("NO")
else:
    print("YES")