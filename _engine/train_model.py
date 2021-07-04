
from sklearn.ensemble import RandomForestClassifier
import argparse
import pickle
from sklearn import preprocessing

# Directory for folder
path_output = "_engine/output/"

# load the face embeddings
print("[INFO] loading face embeddings...")
data = pickle.loads(open( path_output + "embeddings.pickle", "rb").read())

# encode the labels
print("[INFO] encoding labels...")
le = preprocessing.LabelEncoder()
labels = le.fit_transform(data["names"])

# train the model used to accept the 128-d embeddings of the face and
# then produce the actual face recognition
print("[INFO] training model...")
#recognizer = SVC(C=1.0, kernel="linear", probability=True)
recognizer = RandomForestClassifier(n_estimators=100, n_jobs= -1, min_samples_leaf = 1 ,random_state=50)
recognizer.fit(data["embeddings"], labels)

# write the actual face recognition model to disk
f = open( path_output + "recognizer.pickle", "wb")
f.write(pickle.dumps(recognizer))
f.close()

# write the label encoder to disk
f = open( path_output + "le.pickle", "wb")
f.write(pickle.dumps(le))
f.close()
print("[INFO] end training model...")