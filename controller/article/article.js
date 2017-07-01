'use strict';

import formidable from 'formidable';
import timeFormater from 'time-formater';
import server from '../../server/article.js';
import publicJs from '../../prototyoe/public.js';
import AddressComponents from '../../prototyoe/addressComponents.js'
class articleController extends AddressComponents{
	constructor(){
     super();
     this.newArticle = this.newArticle.bind(this);
     this.searchArticle = this.searchArticle.bind(this);
     this.deleteArticle = this.deleteArticle.bind(this);
     this.updateArticle = this.updateArticle.bind(this);
	}
	async newArticle(req,res,next){
           const form = new formidable.IncomingForm();
            form.parse(req,async (err,fields , files) => {
                const {title, content,publishTime,parents} = fields;
                  try{
                      if(!title){
                          throw new Error("文章标题不能为空");
                      }else if(!content){
                           throw new Error("文章内容不能为空")
                      }else if(!publishTime){
                           throw new Error("时间不能为空")
                      }
                   }catch(error){
                         res.send({
                            status:0,
                            type:"ERROR_ARTICLE",
                            message:error.message
                           })
                   }
                   try{
                        const article_id = await this.getId('article_id');
                        // const cityInfo = await this.guessPosition(req);
                        // console.log(cityInfo)
                        // console.log(cityInfo)
                        // console.log(cityInfo)
                        const Article = {
                             title:title,
                             content:content,
                             publishTime:publishTime,
                             parents:parents,
                             id:article_id,
                             // city:cityInfo
                        }
                        await server.articleDb(Article);
                           res.send({
                              status:1,
                              message:"保存文章成功"
                           })
                   }catch(error){
                        res.send({
                           status:0,
                           message:"保存文章失败"
                        })
                   }
            })
	}
  //可以分别搜索年月日时分都行
  async searchArticle(req,res,next){
      const form = new formidable.IncomingForm();
      form.parse(req,async(err,fields,files)=>{
        const  { content } = fields;
        try{
           if(!content){
               throw new Error("搜索内容为空")
           }
        }catch(error){
            res.send({
              status:0,
              type:"ERROR_SEARCH",
              message:error.message
            })
        }
        try{
            const article = await server.searchDb(content);
            if(!article){
                res.send({
                  status:0,
                  type:"ERROR_SEARCH",
                  message:"没有找到相关内容"
                })
            }else{
                res.send({
                  status:0,
                  type:"SUCCESS",
                  message:article
                })  
            }
        }catch(error){
          res.send({
             status:0,
             type:"ERROR_SEARCH",
             message:"搜索失败"
          })
        }
      })
  }
  async deleteArticle(req,res,next){
          const form = new formidable.IncomingForm();
      form.parse(req,async(err,fields,files)=>{
        const  { id } = fields;
        try{
           if(!id){
               throw new Error("删除失败")
           }
        }catch(error){
            res.send({
              status:0,
              type:"ERROR_DELETE",
              message:error.message
            })
        }
        try{
            const article = await server.deleteDb(id);
            if(!article){
                res.send({
                  status:0,
                  type:"ERROR_DELETE",
                  message:"删除失败"
                })
            }else{
                res.send({
                  status:0,
                  type:"SUCCESS",
                  message:article
                })  
            }
        }catch(error){
          res.send({
             status:0,
             type:"ERROR_DELETE",
             message:"删除失败"
          })
        }
    })
  }
    async updateArticle(req,res,next){
      const form = new formidable.IncomingForm();
      form.parse(req,async(err,fields,files)=>{
        const  { id ,title,content,publishTime} = fields;
        try{
           if(!id){
               throw new Error("ID失败")
           }
        }catch(error){
            res.send({
              status:0,
              type:"ERROR_UPDATEA",
              message:error.message
            })
        }
        try{
                  const Article = {
                             title:title,
                             content:content,
                             publishTime:publishTime,
                             // city:cityInfo
                 }
                 console.log(id)

            const article = await server.updataDb(id,{title:title});
            if(!article){
                res.send({
                  status:0,
                  type:"ERROR_UPDATEA",
                  message:"更新失败"
                })
            }else{
                res.send({
                  status:0,
                  type:"SUCCESS",
                  message:article
                })  
            }
        }catch(error){
          res.send({
             status:0,
             type:"ERROR_UPDATEA",
             message:"提交失败"
          })
        }
    })
  }
};

export default new articleController();