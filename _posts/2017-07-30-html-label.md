---
title: html基础知识回顾2——常用的html标签
date: 2017-07-30T09:17:09+00:00
author: xutaotao
layout: post
tags:
  - html
---
<table style="height: 3548px;" width="782">
  <tr>
    <td width="151">
      标签名
    </td>
    
    <td width="176">
      含义
    </td>
    
    <td width="174">
      常用属性
    </td>
    
    <td width="44">
      类型
    </td>
  </tr>
  
  <tr>
    <td width="151">
      ul
    </td>
    
    <td width="176">
      无序列表（UnorderedList）
    </td>
    
    <td width="174">
      type:disc/circle/square
    </td>
    
    <td width="44">
      block
    </td>
  </tr>
  
  <tr>
    <td width="151">
      li
    </td>
    
    <td width="176">
      列表项（List Item）
    </td>
    
    <td width="174">
    </td>
    
    <td width="44">
      block
    </td>
  </tr>
  
  <tr>
    <td width="151">
      ol
    </td>
    
    <td width="176">
      有序列表（OrderedList）</p> 
      
      <p>
        &nbsp;</td> 
        
        <td width="174">
          type:1/a/A/i/I</p> 
          
          <p>
            start：</td> 
            
            <td width="44">
              block
            </td></tr> 
            
            <tr>
              <td width="151">
                dl
              </td>
              
              <td width="176">
                definition list
              </td>
              
              <td width="174">
              </td>
              
              <td width="44">
                block
              </td>
            </tr>
            
            <tr>
              <td width="151">
                dt
              </td>
              
              <td width="176">
                definition type
              </td>
              
              <td width="174">
              </td>
              
              <td width="44">
                block
              </td>
            </tr>
            
            <tr>
              <td width="151">
                dd
              </td>
              
              <td width="176">
                definition details
              </td>
              
              <td width="174">
              </td>
              
              <td width="44">
                block
              </td>
            </tr>
            
            <tr>
              <td width="151">
                form
              </td>
              
              <td width="176">
                表单元素
              </td>
              
              <td width="174">
                action:指定表单数据的处理页面(动态页面)</p> 
                
                <p>
                  method:GET/POST,前者把请求数据追加在地址栏查询字符串中(有长度限制)；后者把数据以单独的数据包发送给服务器(无长度限制、且可用于文件上传)
                </p>
                
                <p>
                  enctype:EncodedType表单中提交的数据的编码类型，可取值：
                </p>
                
                <p>
                  <strong>text/plain</strong>表单数据不做任何编码直接上传
                </p>
                
                <p>
                  <strong>application/x-www-form-urlencoded</strong>把表单中的数据(中文、特殊符号)编码后再上传，只能对字符进行编码
                </p>
                
                <p>
                  <strong>multipart/form-data</strong>以一种特殊的格式上传字符/字节数据</td> 
                  
                  <td width="44">
                    block
                  </td></tr> 
                  
                  <tr>
                    <td width="151">
                      <input type=”text”/>
                    </td>
                    
                    <td width="176">
                      单行文本输入框
                    </td>
                    
                    <td width="174">
                      name(必需)指定输入的内容的含义</p> 
                      
                      <p>
                        value待提交的值/提示文字
                      </p>
                      
                      <p>
                        maxlength允许输入的最多的字符数
                      </p>
                      
                      <p>
                        readonly只要出现即表示输入域只读(不能改但可以提交)
                      </p>
                      
                      <p>
                        disabled只要出现即表示输入域禁用(不能改且不能被提交)</td> 
                        
                        <td width="44">
                          inline
                        </td></tr> 
                        
                        <tr>
                          <td width="151">
                            <input type=”submit”/>
                          </td>
                          
                          <td width="176">
                            提交按钮，可以提交表单内容
                          </td>
                          
                          <td width="174">
                          </td>
                          
                          <td width="44">
                            inline
                          </td>
                        </tr>
                        
                        <tr>
                          <td width="151">
                            <label></label>
                          </td>
                          
                          <td width="176">
                            便签、标签，用于给输入域添加提示文字
                          </td>
                          
                          <td width="174">
                            for指定为某个输入域的id
                          </td>
                          
                          <td width="44">
                            inline
                          </td>
                        </tr>
                        
                        <tr>
                          <td width="151">
                            <input type=”radio”/>
                          </td>
                          
                          <td width="176">
                          </td>
                          
                          <td width="174">
                            name</p> 
                            
                            <p>
                              value
                            </p>
                            
                            <p>
                              checked只要出现即表示单选按钮被选定</td> 
                              
                              <td width="44">
                                inline
                              </td></tr> 
                              
                              <tr>
                                <td width="151">
                                  <select></select>
                                </td>
                                
                                <td width="176">
                                  下列框
                                </td>
                                
                                <td width="174">
                                  name</p> 
                                  
                                  <p>
                                    size指定显示出来的行数
                                  </p>
                                  
                                  <p>
                                    multiple只要出现即表示可以多选(按下Ctrl/Shift)</td> 
                                    
                                    <td width="44">
                                      inline
                                    </td></tr> 
                                    
                                    <tr>
                                      <td width="151">
                                        <optgroup></optgroup>
                                      </td>
                                      
                                      <td width="176">
                                        选项组
                                      </td>
                                      
                                      <td width="174">
                                        label
                                      </td>
                                      
                                      <td width="44">
                                      </td>
                                    </tr>
                                    
                                    <tr>
                                      <td width="151">
                                        <option></option>
                                      </td>
                                      
                                      <td width="176">
                                      </td>
                                      
                                      <td width="174">
                                        value</p> 
                                        
                                        <p>
                                          selected只要出现即表示被选定</td> 
                                          
                                          <td width="44">
                                          </td></tr> 
                                          
                                          <tr>
                                            <td width="151">
                                              <textarea></textarea></p> 
                                              
                                              <p>
                                                值在开始标记和结束标记之间，无value属性</td> 
                                                
                                                <td width="176">
                                                  文本区域，多行文本输入框，只能输入纯文本
                                                </td>
                                                
                                                <td width="174">
                                                  name</p> 
                                                  
                                                  <p>
                                                    rows显示出的行数
                                                  </p>
                                                  
                                                  <p>
                                                    cols显示出的列数</td> 
                                                    
                                                    <td width="44">
                                                      inline
                                                    </td></tr> 
                                                    
                                                    <tr>
                                                      <td width="151">
                                                        <input type=”hidden”/>
                                                      </td>
                                                      
                                                      <td width="176">
                                                        在表单中添加一个隐藏字段
                                                      </td>
                                                      
                                                      <td width="174">
                                                        name(必需)隐藏字段的名</p> 
                                                        
                                                        <p>
                                                          value(必需)隐藏字段的值</td> 
                                                          
                                                          <td width="44">
                                                          </td></tr> 
                                                          
                                                          <tr>
                                                            <td width="151">
                                                              <fieldset></fieldset>
                                                            </td>
                                                            
                                                            <td width="176">
                                                              输入域集合
                                                            </td>
                                                            
                                                            <td width="174">
                                                            </td>
                                                            
                                                            <td width="44">
                                                              block
                                                            </td>
                                                          </tr>
                                                          
                                                          <tr>
                                                            <td width="151">
                                                              <legend></legend>
                                                            </td>
                                                            
                                                            <td width="176">
                                                              输入域集合的标签名
                                                            </td>
                                                            
                                                            <td width="174">
                                                            </td>
                                                            
                                                            <td width="44">
                                                            </td>
                                                          </tr>
                                                          
                                                          <tr>
                                                            <td width="151">
                                                              <button></button>
                                                            </td>
                                                            
                                                            <td width="176">
                                                              按钮
                                                            </td>
                                                            
                                                            <td width="174">
                                                            </td>
                                                            
                                                            <td width="44">
                                                              inline
                                                            </td>
                                                          </tr>
                                                          
                                                          <tr>
                                                            <td width="151">
                                                              <iframe></iframe>
                                                            </td>
                                                            
                                                            <td width="176">
                                                              在当前页面中嵌入另一个页面
                                                            </td>
                                                            
                                                            <td width="174">
                                                              src待嵌入的页面的URL</p> 
                                                              
                                                              <p>
                                                                width
                                                              </p>
                                                              
                                                              <p>
                                                                height
                                                              </p>
                                                              
                                                              <p>
                                                                style=”border:0”不显示边框</td> 
                                                                
                                                                <td width="44">
                                                                  inline
                                                                </td></tr> 
                                                                
                                                                <tr>
                                                                  <td colspan="4" width="546">
                                                                  </td>
                                                                </tr>
                                                                
                                                                <tr>
                                                                  <td width="151">
                                                                  </td>
                                                                  
                                                                  <td width="176">
                                                                  </td>
                                                                  
                                                                  <td width="174">
                                                                  </td>
                                                                  
                                                                  <td width="44">
                                                                  </td>
                                                                </tr>
                                                                
                                                                <tr>
                                                                  <td width="151">
                                                                  </td>
                                                                  
                                                                  <td width="176">
                                                                  </td>
                                                                  
                                                                  <td width="174">
                                                                  </td>
                                                                  
                                                                  <td width="44">
                                                                  </td>
                                                                </tr>
                                                                
                                                                <tr>
                                                                  <td width="151">
                                                                  </td>
                                                                  
                                                                  <td width="176">
                                                                  </td>
                                                                  
                                                                  <td width="174">
                                                                  </td>
                                                                  
                                                                  <td width="44">
                                                                  </td>
                                                                </tr>
                                                                
                                                                <tr>
                                                                  <td width="151">
                                                                  </td>
                                                                  
                                                                  <td width="176">
                                                                  </td>
                                                                  
                                                                  <td width="174">
                                                                  </td>
                                                                  
                                                                  <td width="44">
                                                                  </td>
                                                                </tr>
                                                                
                                                                <tr>
                                                                  <td width="151">
                                                                  </td>
                                                                  
                                                                  <td width="176">
                                                                  </td>
                                                                  
                                                                  <td width="174">
                                                                  </td>
                                                                  
                                                                  <td width="44">
                                                                  </td>
                                                                </tr></tbody> </table>