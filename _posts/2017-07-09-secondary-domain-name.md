---
title: 关于如何将二级域名解析到服务器子目录的问题
date: 2017-07-09T16:26:58+00:00
author: xutaotao
layout: post
categories:
  - 前端日记
tags:
  - 二级域名
---
心里默念一百遍“徐涛焘你个菜鸡”之后，对于将二级域名解析到服务器子目录的这个问题我终于解决了。

首先得弄明白域名解析的原理，域名解析是把域名指向网站空间IP，然后通过注册的域名可以方便地访问到网站的一种服务。然后再弄明白什么是顶级域名，二级域名，三级域名。举个例子：xutaotao.cn是顶级域名，a.xutaotao.cn是二级域名，aaa.a.xutaotao.cn是三级域名，比如www.a.xutaotao.cn它是个三级域名，前面的www只是作为网页服务用的，不要傻傻分不清（我就是傻傻分不清），www.xutaotao.cn和xutaota.cn效果一般一样，但是a.xutaotao.cn和www.a.xutaotao.cn就可能会有差别了，反正域名级别要搞清楚。

那要怎么将一个特定的二级域名解析到网站空间的一个子目录呢？那肯定要将此域名映射到空间子目录，通俗来说就是绑定到空间子目录，让它们之间有种联系，而这种联系就是用代码来实现。下面一共三步，就可以实现将二级域名解析到服务器子目录。

第一步：先在域名控制台将自己的二级域名解析到自己的服务器，记录值为自己主机的ip地址。

第二步：修改服务器配置，我的服务器环境是CentOS6.8|PHP5.4|Apache2.4.10|mysql5.6。这里服务器配置要修改两个地方：第一个httpd.conf文件，另一个是hosts文件。在我的环境下，这两个文件分别在/etc/httpd/conf/httpd.conf和etc/hosts。下面开始进行修改，修改工具为Xshell5或者putty,在这里我用的Xshell5。

首先修改httpd.conf,用vi /etc/httpd/conf/httpd.conf命令行打开并编辑http.conf

1.确定LoadModule rewrite\_module modules/mod\_rewrite.so是否被注释掉，若被注释，请去除前面的#，没有则不管。

2.确定directory的权限，是否是all.

&nbsp;

3.确定此处的语句是否被注释掉，若被注释掉，请去除#

<img class="size-full wp-image-210 aligncenter" src="http://www.xutaotao.cn/wp-content/uploads/2017/07/OQYW5QZB3D9ZCFMZE1G3.png" alt="" width="341" height="97" />

4.在文档最后添加如下代码，箭头标记的地方特别注意，前面一定不要有#，如果有#，NameVirtualHost无法开启，至于NameVirtualHost是什么，自行Google或者百度，推荐Google.到此，httpd.conf文件配置完成，按下esc键退出编辑状态，输入命令   ：wq  退出并保存。

第一个DocumentRoot和Servername为自己的网站根目录和顶级域名

第二个DocumentRoot和Servername为自己的网站二级目录和二级域名

如果你想添加很多二级域名，不断重复以上语句就可以。

然后修改hosts文件，同样vi /ect/hosts开始编辑文档，在第一个箭头下面加入自己的域名。保存并退出。至此修改完成。

第三步：最重要的一步，记得重新启动服务器以及httpd服务，到此你就可以正常访问了。

&nbsp;

&nbsp;