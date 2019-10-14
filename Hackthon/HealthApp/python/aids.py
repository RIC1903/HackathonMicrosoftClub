#!/usr/bin/env python
# coding: utf-8

# In[1]:


#import all the necessory packages
import csv
import numpy as np  
import pandas as pd
#import pylab as pl
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA


# In[2]:


from sklearn.model_selection import KFold
from sklearn.model_selection import cross_val_score


# In[3]:


aids=pd.read_excel(r"C:\Users\LoveYouMaa\Desktop\study\aids.xlsx")
#aids=pd.read_excel(r"C:\Users\Biswajit Satapathy\Documents\aids_data.xlsx")


# In[5]:


A=np.array(aids)
aids


# In[6]:


shape=A.shape
row=shape[0]
col=shape[1]
# print(row)
# print(col)


# In[8]:


X=aids.iloc[:,:col-1]
y=aids.iloc[:,-1]


# In[9]:


X=np.array(X)
y=np.array(y)
#print(y)


# In[10]:


from sklearn.tree import DecisionTreeClassifier


# In[11]:


tree = DecisionTreeClassifier(random_state=50)


# In[12]:


from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
rfc=RandomForestClassifier()
lr=LogisticRegression()


# In[13]:


from sklearn.model_selection import train_test_split


# In[14]:


X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3)


# In[15]:


xtrain=np.array(X_train)
ytrain=np.array(y_train)
xtest=np.array(X_test)
ytest=np.array(y_test)


# In[16]:


tree.fit(xtrain,ytrain)


# In[17]:


ypred=tree.predict(xtest)


# In[18]:


tree.score(xtest,ytest)


# In[ ]:

# In[ ]:


#p=[sys.argv[1],sys.argv[2],sys.argv[3],sys.argv[4],sys.argv[5],sys.argv[6],sys.argv[7],sys.argv[8],sys.argv[9]]
p=[1,2,3,4,5,6,7,8,9]
p=np.array(p)
p=p.reshape(1,-1)

# In[ ]:


ans=tree.predict(p)
print(ans)
if(ans[0]==30):
    print("NO")
else:
    print("YES")
