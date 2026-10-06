import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

df = pd.read_csv(r'd:\sem5\OST\BostonHousing.xls')

# Basic info
print("Shape:", df.shape)
print("\nFirst 5 rows:")
print(df.head())
print("\nData Types:")
print(df.dtypes)
print("\nStatistical Summary:")
print(df.describe())
print("\nMissing Values:")
print(df.isnull().sum())

# Histograms for all features
df.hist(figsize=(14, 10), bins=20, edgecolor='black')
plt.suptitle('Distribution of All Features', fontsize=16)
plt.tight_layout()
plt.show()

# Correlation heatmap
plt.figure(figsize=(12, 9))
sns.heatmap(df.corr(), annot=True, fmt='.2f', cmap='coolwarm', square=True)
plt.title('Correlation Heatmap')
plt.tight_layout()
plt.show()

# Boxplots for outlier detection
fig, axes = plt.subplots(3, 5, figsize=(18, 10))
axes = axes.flatten()
for i, col in enumerate(df.columns):
    sns.boxplot(y=df[col], ax=axes[i])
    axes[i].set_title(col)
axes[-1].set_visible(False)
plt.suptitle('Boxplots - Outlier Detection', fontsize=16)
plt.tight_layout()
plt.show()

# Scatter plots of key features vs MEDV (target)
key_features = ['rm', 'lstat', 'crim', 'ptratio', 'nox', 'dis']
fig, axes = plt.subplots(2, 3, figsize=(15, 9))
axes = axes.flatten()
for i, col in enumerate(key_features):
    axes[i].scatter(df[col], df['medv'], alpha=0.5, edgecolors='k', linewidth=0.5)
    axes[i].set_xlabel(col)
    axes[i].set_ylabel('medv')
    axes[i].set_title(f'{col} vs medv')
plt.suptitle('Feature vs Target (medv) Scatter Plots', fontsize=16)
plt.tight_layout()
plt.show()

# Pairplot for selected features
selected = ['rm', 'lstat', 'crim', 'ptratio', 'medv']
sns.pairplot(df[selected], diag_kind='kde')
plt.suptitle('Pairplot of Selected Features', y=1.02, fontsize=16)
plt.show()

# Distribution of target variable
plt.figure(figsize=(8, 5))
sns.histplot(df['medv'], kde=True, bins=30)
plt.title('Distribution of Median Home Value (medv)')
plt.xlabel('medv')
plt.ylabel('Frequency')
plt.tight_layout()
plt.show()
