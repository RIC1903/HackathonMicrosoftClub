#!/usr/bin/env python
# coding: utf-8

# In[1]:


#import all the necessory packages
import csv
import numpy as np  
import pandas as pd
import pylab as pl
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA


# In[2]:


from sklearn.model_selection import KFold
from sklearn.model_selection import cross_val_score


# In[3]:


dia=pd.read_excel(r"C:\Users\Biswajit Satapathy\Desktop\study\diabetes.xlsx")


# In[4]:


A=np.array(dia)
dia


# In[5]:


shape=A.shape
row=shape[0]
col=shape[1]
# print(row)
# print(col)


# In[6]:


X=dia.iloc[:,:col-1]
y=dia.iloc[:,-1]


# In[7]:


X=np.array(X)
y=np.array(y)
#print(y)


# In[8]:


from sklearn.tree import DecisionTreeClassifier


# In[9]:


tree = DecisionTreeClassifier(random_state=50)


# In[10]:


from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
rfc=RandomForestClassifier()
lr=LogisticRegression()


# In[11]:


from sklearn.model_selection import train_test_split


# In[12]:


X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3)


# In[13]:


xtrain=np.array(X_train)
ytrain=np.array(y_train)
xtest=np.array(X_test)
ytest=np.array(y_test)


# In[14]:


tree.fit(xtrain,ytrain)


# In[15]:


ypred=tree.predict(xtest)


# In[16]:


tree.score(xtest,ytest)


# In[17]:


a=int(input("No of Pregnancy:"))
b=int(input("Glucose:"))
c=int(input("BloodPressure:"))
d=int(input("SkinThickness:"))
e=int(input("Insulin:"))
f=float(input("BMI:"))
g=float(input("Pedgree function:"))
h=int(input("Age:"))


# In[18]:


p=[a,b,c,d,e,f,g,h]
p=np.array(p)
p=p.reshape(1,-1)
p


# In[19]:


ans=tree.predict(p)
print(ans)
if(ans[0]==0):
    print("NO")
else:
    print("YES")

