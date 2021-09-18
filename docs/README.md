# 进化树用户说明文档

## 一、介绍

这是一个生物进化树的可视化工具（以下简称“本工具”），支持导入 Newick、NEXUS 等格式的树文件，且具备选中分支、标记分支、编辑/删除子树等功能，支持树结构转换，支持字体切换、中英文切换，支持元数据展示，支持将进化树图像导出为 svg、pdf 等文件。

## 二、系统功能

### 2.1 概况

本工具支持对进化树页面的系统字体进行切换，支持界面语言的中/英切换。

### 2.2 字体切换

内置多种字体，字体栏（图 2.1）处，支持对字体类型、字体颜色、字体大小等进行修改，修改后即时生效。

<div align=center><img src="/images/字体栏.png"></div>

<center>图2.1：字体栏</center>

### 2.3 中/英切换

界面**右上角**可以修改系统语言，支持中/英切换，修改后即时生效。

## 三、数据导入和树结构导出

### 3.1 概况

本工具支持多种导入格式和多种导出格式，支持的导入格式包括 Newick、NHX、Extended Newick、Nexus、PhyloXML、Jplace、NeXML、phylip，支持的导出格式包括 SVG、PNG、JPG、EPS、PDF、Newick、Nexus、PhyloXML、NeXML、NHX、BEAST NEXUS、jtree。

### 3.2 导入文件

#### Newick

Newick 格式是进化树中常见的一种树格式，如下的 Newick 文本，即表示图 3.1 所示的树。

```json
(A:0.1,B:0.2,(C:0.3,D:0.4)E:0.5)F;
```

其中，括号表示内部节点，比如`(C:0.3,D:0.4)E:0.5`，意思是节点 C、节点 D 会经过路径汇总到节点 E 上，冒号后的数字表示分支的长度。

<div align=center><img src="/images/Newick.png" /></div>

<center>图3.1：一棵普通的树</center>

#### NHX

NHX 格式是 New Hampshire eXtended 的缩写，是 Newick 格式的扩展，即 NHX 在 Newick 的基础上添加了注释功能，例如，以下的 NHX 文本不仅可以用来表示图 3.1 所示的树结构，还可以展示节点的物种、置信度等注释信息。

```json
(A:0.1[&&NHX:S=human:B=100],B:0.2[&&NHX:S=human:B=100],
(C:0.3[&&NHX:S=human:B=100],D:0.4[&&NHX:S=human:B=100])E:0.5[&&NHX:S=human:B=100])F;
```

其中，`[&&NHX:`和`]`之间的内容表示注释信息，如`A:0.1[&&NHX:S=human:B=100]`这一段中`:S=human`就是注释信息之一，他表示该节点的物种（Species）名称为 human，同样的`:B=100`也是注释信息，它表示该节点对应的父分支的置信度（confidence）为 100。当然，NHX 除了物种、置信度之外，还支持其它类型的注释，[点此查看 NHX 文档](http://www.phylosoft.org/NHX/)。

#### Extended Newick

Extended Newick 也是 Newick 格式的另一种扩展形式，故本节原版 Newick 的文本同样适用于 Extended Newick，其新增了用于表示混合节点的#number。如下的 Extended Newick 文本可以用于表示图 3.2 所示的树

```
(A,B,((C,(Y)x#1)c,(x#1,D)d)e)F;
```

其中`x#1`即表示编号为 1 的混合节点 x（如果有更多的混合节点，则依次为`#2`、`#3`...）

<div align=center><img src="/images/Extended Newick.png" /></div>

<center>图3.2：一棵具有混合节点x的树</center>

#### Nexus

Nexus 是一种流行的文件格式，许多应用程序都支持此格式。Nexus 文件一般具有`.nxs`或`.nex`扩展名。以下的 Nexus 文件示例可以用于表示图 3.1 所示的树。

```
#NEXUS
BEGIN TAXA;
      Dimensions NTax=6;
      TaxLabels A B C D E F;
END;
BEGIN TREES;
      Tree best=(A:0.1,B:0.2,(C:0.3,D:0.4)E:0.5)F;
END;
```

在 Nexus 文件中，第一行必须以`#NEXUS`开头，此外，Nexus 是利用块（block）来存储数据的，比如**TAXA block**、**DATA block**、**TREES block**，每个块都以`BEGIN`为开始，`END`为结束，其中，TAXA block 是**必不可少**的。在上述 Nexus 示例中，一共使用了 TAXA、TREES 这两个 block，它们分别定义了 A~F 合计 6 个标签、定义了一棵树。[点击此处查看 Nexus 说明](http://wiki.christophchamp.com/index.php?title=NEXUS_file_format)。

#### PhyloXML

PhyloXML 是一种用于描述进化树和相关数据的 XML 语言，以下的 PhyloXML 文本可用于表示图 3.1 的树。

```xml
<phylogeny rooted="true">
   <clade>
	  <taxonomy>
		<scientific_name>F</scientific_name>
	  </taxonomy>
      <clade branch_length = "0.1">
         <taxonomy>
            <scientific_name>A</scientific_name>
         </taxonomy>
      </clade>
	  <clade branch_length = "0.2">
         <taxonomy>
            <scientific_name>B</scientific_name>
         </taxonomy>
      </clade>
      <clade branch_length = "0.5">
		 <taxonomy>
            <scientific_name>E</scientific_name>
         </taxonomy>
         <clade branch_length = "0.3">
            <taxonomy>
               <scientific_name>C</scientific_name>
            </taxonomy>
         </clade>
         <clade branch_length = "0.4">
            <taxonomy>
               <scientific_name>D</scientific_name>
            </taxonomy>
         </clade>
      </clade>
   </clade>
</phylogeny>
```

不难看出，如果只是想描述一棵简单的树，那么使用 PhyloXML 会使得这个过程变得复杂且不太适用。[点击此处查看 PhyloXML 更多信息](https://bmcbioinformatics.biomedcentral.com/articles/10.1186/1471-2105-10-356)

#### Jplace

Jplace 是一种基于 JSON 的格式，它有 5 个 key 值，分别是`tree`， `fields`， `placements`， `metadata` and `version`，其中，`tree`用于描述树格式信息，`fields`用于描述序列的键，`placements`用于描述序列的分布和值，如下所示的 Jplace 文本不仅可以表示图 3.1 所示的树结构，还可以展示分支上的序列信息。

```json
{
  "tree": "(A:0.1{0},B:0.2{1},(C:0.3{2},D:0.4{3})E:0.5{4})F{5};",
  "placements": [
    {
      "p": [
        [1, 2500, 0.7, 0.004333, 0.0005],
        [0, 2500, 0.1, 0.000008, 0.0235]
      ],
      "n": [["fragment1"], ["fragment2"]]
    },
    {
      "p": [[2, 1500, 1.0, 0.005333, 0.000006]],
      "n": [["fragment3"], ["fragment4"]]
    }
  ],
  "metadata": {
    "invocation": "a jplace simple demo"
  },
  "version": 3,
  "fields": [
    "edge_num",
    "likelihood",
    "like_weight_ratio",
    "distal_length",
    "pendant_length"
  ]
}
```

关于 Jplace 格式的更多信息，可以[点击此处查看](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0031009)。

#### NeXML

NeXML 是一种基于 XML 的格式，下列的 NeXML 文本可以用来表示图 3.1 所示的树结构

```xml
<nex:nexml xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:xsd="http://www.w3.org/2001/XMLSchema#" xmlns:map="http://phylomap.org/terms.owl#" xmlns="http://www.nexml.org/2009" xmlns:nex="http://www.nexml.org/2009" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" generator="Bio::Phylo::Project v.0.58" version="0.9" xsi:schemaLocation="http://www.nexml.org/2009 http://www.nexml.org/2009/nexml.xsd">
<otus id="os10">
	<otu id="ou11" label="A"/>
	<otu label="B" id="ou12"/>
	<otu label="C" id="ou13"/>
	<otu label="D" id="ou14"/>
</otus>
<trees otus="os10" id="ts2">
	<tree id="te3" xsi:type="nex:FloatTree">
		<node id="ne4" root="true" label="F"/>
		<node id="ne5" otu="ou11" label="A"/>
		<node otu="ou12" label="B" id="ne6"/>
		<node id="ne7" label="E"/>
		<node id="ne8" otu="ou13" label="C"/>
		<node id="ne9" label="D" otu="ou14"/>
		<edge source="ne4" id="edge5" target="ne5" length="0.1"/>
		<edge id="edge6" target="ne6" length="0.2" source="ne4"/>
		<edge id="edge7" target="ne7" length="0.5" source="ne4"/>
		<edge source="ne7" target="ne8" id="edge8" length="0.3"/>
		<edge source="ne7" length="0.4" target="ne9" id="edge9"/>
	</tree>
</trees>
</nex:nexml>
```

[NeXML 官网](http://www.nexml.org/)还提供了 NeXML 格式验证、`Nexus->NeXML`、`Newick->NeXML`、`NeXML->json`、`NeXML->rdf`等功能。关于 NeXML 格式的说明，可以[点击此处查看详情](https://github.com/nexml/nexml/wiki/NeXML-Manual)。

#### phylip

### 3.4 导出文件

#### SVG

#### PNG

#### JPG

#### EPS

#### PDF

#### Newick

#### Nexus

#### PhyloXML

#### NeXML

#### NHX

#### BEAST NEXUS

#### jtree

## 四、进化树展示

### 4.1 概况

### 4.2 自适应的树结构

### 4.3 遮罩层

### 4.4 标签形式

### 4.5 元数据

## 五、进化树的操作

### 5.1 概况

在进化树的展示区域，本工具支持对其进行可视化操作，如缩放、选中节点/分支、树结构转换、拖动图形区域等。

### 5.2 树结构缩放

在进化树展示区域，往上滚动鼠标滚轮，可以放大树结构，往下滚动鼠标滚轮，可以缩小树结构。

### 5.3 点/分支的选中状态

进化树的分支和节点支持鼠标选中，当分支/节点被选中时，其颜色会变为红色。

### 5.4 树结构转换

支持以线性结构、环形结构显示进化树。

<div align=center><img src="/images/树结构-线形.png" style="zoom:80%;"/></div>

<center>图5.1：线性结构</center>

<div align=center><img src="/images/树结构-环形.png" style="zoom:80%;" /></div>

<center>图5.2：环形结构</center>

### 5.5 拖动图形区域

鼠标左键点击 Graph 区域不放，可以拖拽 Graph 向右移动。

<div align=center><img src="/images/Graph拖动.png" /></div>

<center>图5.3：拖拽Graph区域</center>

### 5.6 其它操作

支持标记全部叶分支、标记全部终端分支、标记全部内部分支、标记分支、标记根到当前分支路径、以当前节点为根节点重构树结构、隐藏/展示子树、添加/删除子树、编辑子树、翻转子树。
