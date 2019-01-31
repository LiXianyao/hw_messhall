开发说明
1、frontend/ ————react项目
    每次编写完成后，npm run build，得到frontend/build/文件夹，
    把里面的所有内容放到messhall/src/main/resources/templates里面，使得后台可以访问到
2、src/main/java——spring boot 写的后台程序

如何运行:
根目录打命令 
mvn install 编译
mvn spring-boot:run 跑起后台程序
然后访问localhost:8080/
本意是想加上按<a>跳转json，然而试了几下不知道url怎么写才对 -> clean install后搞定了

处理问题集：
1、不知道为什么网页的修改没有生效 -> 静态资源修改，编译时要打mvn clean install
