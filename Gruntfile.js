module.exports = function(grunt){

    // 显示任务时间
    require("time-grunt")(grunt);
    // 载入任务插件
    require("load-grunt-tasks")(grunt);


    // 项目配置
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        uglify: {
            options: {
                banner: "/*! <%= pkg.name %> <%= grunt.template.today(\"yyyy-mm-dd\") %> */\n"
            },
            build: {
                src: "dist/<%=pkg.name %>.js",
                dest: "dist/<%= pkg.name %>.min.js"
            }               
        },

        // 模块编译源码
        requirejs: {
            build: {
                options: {
                    baseUrl: "src",
                    name: "canvas-painter",
                    out: "dist/canvas-painter.js",
                    // 不压缩源码
                    optimize: "none",
                    // 打包require的依赖
                    findNestedDependencies: true,
                    // 防止r.js插入分号
                    skipSemiColonInsertion: true,
                    // 包裹源码，防止污染库文件
                    wrap: {
                        startFile: "src/intro.js",
                        endFile: "src/outro.js"
                    },
                    // 第三方依赖路径配置
                    paths: {},
                    rawText: {},
                    // 构建处理，主要是剔除模块中的AMD定义
                    onBuildWrite: convert
                }
            }
        },

        // js格式验证
        jshint: {
            all: {
                src: [
                    "src/**/*.js", "Gruntfile.js"
                ],
                options: {
                    jshintrc: true
                }
            }
        },

        // 自动验证编译
        watch: {
            jshint: {
                files: ["src/**/*.js"],
                tasks: ["jshint:all", "requirejs:build", "compileBuild"]
            }
        }

    });

    // 默认任务
    grunt.registerTask("default", ["jshint:all", "requirejs:build", "compileBuild"]);


    // 开发
    grunt.registerTask("dev", ["watch"]);

    

    // 注册自定义替换任务
    grunt.registerTask("compileBuild", "compile Build file.", function() {
        var name = "./dist/canvas-painter.js";
        var file = grunt.file.read(name);

        var version = grunt.file.readJSON("./package.json").version;

        file = file.replace( /@VERSION/g, version )
                // 替换时间
                // yyyy-mm-ddThh:mmZ
                .replace( /@DATE/g, ( new Date() ).toISOString().replace( /:\d+\.\d+Z$/, "Z" ) );

        grunt.file.write( name, file );
    });
};


/**
 * 剔除模块中AMD的定义
 * @param {String} 模块名称
 * @param {String} 模块路径
 * @param {String} 模块内容
 */
function convert(name, path, contents){
    var rdefineEnd = /\}\);[^}\w]*$/;
        // 处理 var 模块
        if ( /.\/var\//.test( path ) ) {
            contents = contents
                .replace( /define\([\w\W]*?return/, "var " + (/var\/([\w-]+)/.exec(name)[1]) + " =" )
                .replace( rdefineEnd, "" );

        } else {

            // 
            if ( name !== "canvas-painter" ) {
                contents = contents
                    .replace( /\s*return\s+[^\}]+(\}\);[^\w\}]*)$/, "$1" )
                    // Multiple exports
                    .replace( /\s*exports\.\w+\s*=\s*\w+;/g, "" );
            }

            // 剔除 define 包裹
            contents = contents
                .replace( /define\([^{]*?{/, "" )
                .replace( rdefineEnd, "" );

            // 删除有/* ExcludeStart */ /* ExcludeEnd */标识的的注释
            contents = contents
                .replace( /\/\*\s*ExcludeStart\s*\*\/[\w\W]*?\/\*\s*ExcludeEnd\s*\*\//ig, "" )
                .replace( /\/\/\s*BuildExclude\n\r?[\w\W]*?\n\r?/ig, "" );

            // 删除空模块
            contents = contents
                .replace( /define\(\[[^\]]+\]\)[\W\n]+$/, "" );
        }
        return contents;
}