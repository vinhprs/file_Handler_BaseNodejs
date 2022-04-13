const { argv } = require('process');
const process = require('process');
const path = require('path')
const fs = require('fs')
const moment = require('moment')
// moment.format()

// file context
const context = process.argv[2]
const myPath = __dirname + context.slice(1) + '/'


// file type

let fileTypeArr  = []
if(process.argv[3].includes('type'))
    fileTypeArr = process.argv[3].slice(6).split(',')

var option = []
if(fileTypeArr.length <= 0) {
    for(let i=3; i<process.argv.length; i++)
    {
        option.push(process.argv[i].slice(0,3))
    }
}
else {
    option.push('--t')
    for(let i=4;i<process.argv.length;i++) {
        option.push(process.argv[i].slice(0,3))
    }
}
// console.log(option)

// Create file's Date
function createDate(file) {
  const { birthtime } = fs.statSync(file)
  return birthtime.toISOString()
}
let date_ob = new Date()

// Create file's size 
function createSize(file) {
  const {size} = fs.statSync(file)
  return size / 1024
}

// check 2days if it's in the same week
const thisIsMagic = (year, month, day) => {
  if (month < 3) {
      year--;
      month += 12;
  }
  return 365*year + year/4 - year/100 + year/400 + (153*month - 457)/5 + day - 306;
}

if(context[0] == '.' && context[1] == '/' && argv.length <= 7) {
    // create folder with given type    
    if(fileTypeArr.length >0) {

        for(let i=0; i<fileTypeArr.length;i++) 
               {
                try {
                    if (!fs.existsSync(`${context}/${fileTypeArr[i]}`)) {
                      fs.mkdirSync(`${context}/${fileTypeArr[i]}`)
                    }
                  } catch (err) {
                    console.error(err)
                  }
               }
    }
    
    // check if it's a file
    const isFile = fileName => {
        return fs.lstatSync(myPath+ fileName).isFile()
      }
    
    // check if it's a folder
    const isFolder = fileName => {
        return fs.lstatSync(myPath+ fileName).isDirectory()
    }

    // check if it's equal 4 types given 
    const isTypeFolder = fileName => {
        return fileName ==='image' || fileName ==='text' || fileName ==='hash' || fileName ==='others' || fileName=== 'A-D' 
        || fileName === 'E-H' || fileName === 'I-L' || fileName ==='M-P' || fileName === 'Q-T' || fileName === 'U-X'
        || fileName === 'Y-ZandOthers' || fileName === 'VeryBig' || fileName === 'Big' || fileName === 'Small' || fileName === 'Medium'
        || fileName === 'Tiny'
        }

    fs.readdirSync(myPath).map(fileName => {

        // Move file to folder
        if(isFile(fileName)) {

            // Get file's time into Array Time
          
            const oldFilePath = path.join(myPath, fileName)
            const fileExtension =  path.extname((path.join(myPath, fileName)))
            switch(fileExtension) {
                case '.jpg':
                case '.png':
                case '.gif':
                case '.tif':
                    const existI = fileTypeArr.findIndex( type => type ==='image')
                    if(existI !=-1)
                     fs.copyFile(oldFilePath,`${myPath}image/${fileName}`, err => {
                       if(err) throw err
                     })
                     break;
                case '.txt':
                    const existT = fileTypeArr.findIndex( type => type ==='text')
                    if(existT !=-1)
                     fs.copyFile(oldFilePath,`${myPath}text/${fileName}`, err => {
                       if(err) throw err
                     })
                     break;
                 case '.hash':
                    const existB = fileTypeArr.findIndex( type => type ==='hash')
                    if(existB !=-1)
                     fs.copyFile(oldFilePath,`${myPath}hash/${fileName}`, err => {
                       if(err) throw err
                     })
                     break;
                 default:
                     const exist = fileTypeArr.findIndex( type => type ==='others')
                     if(exist != -1 && fileName != 'index.js' && fileExtension != '.json') {
                        fs.copyFile(oldFilePath,`${myPath}others/${fileName}`, err => {
                          if(err) throw err
                        })
                     }
            }
          }
    })

    // Check each folder to handle with given name
    fs.readdirSync(myPath).map(fileName => {

      // If --type is exist and create type folder
      if(isFolder(fileName) && isTypeFolder(fileName) && option.indexOf('--n') != -1) {
          fs.readdirSync(`${myPath}${fileName}`).map(childFile => {
            if(isFile(fileName + '/' + childFile)) {
                const oldChildFilePath = path.join(`${myPath}${fileName}`,childFile)
                console.log(oldChildFilePath)
                const firstLetter = childFile[0].toUpperCase()
                
                if(firstLetter === 'A' || firstLetter === 'B' || firstLetter === 'C' || firstLetter === 'D')
                {
                    try {
                        if (!fs.existsSync(`${myPath}${fileName}/A-D`)) {
                          fs.mkdirSync(`${myPath}${fileName}/A-D`)
                        }
                        fs.renameSync(oldChildFilePath,`${myPath}${fileName}/A-D/${childFile}`)
                      } catch (err) {
                        console.error(err)
                      }
                }
                else if(firstLetter === 'E' || firstLetter === 'F' || firstLetter === 'G' || firstLetter === 'H') {
                    try {
                        if (!fs.existsSync(`${myPath}${fileName}/E-H`)) {
                          fs.mkdirSync(`${myPath}${fileName}/E-H`)
                        }
                        fs.renameSync(oldChildFilePath,`${myPath}${fileName}/E-H/${childFile}`)
                      } catch (err) {
                        console.error(err)
                      }
                }
                else if(firstLetter === 'I' || firstLetter === 'J' || firstLetter === 'K' || firstLetter === 'L') {
                    try {
                        if (!fs.existsSync(`${myPath}${fileName}/I-L`)) {
                          fs.mkdirSync(`${myPath}${fileName}/I-L`)
                        }
                        fs.renameSync(oldChildFilePath,`${myPath}${fileName}/I-L/${childFile}`)
                      } catch (err) {
                        console.error(err)
                      }
                }
                else if(firstLetter === 'M' || firstLetter === 'N' || firstLetter === 'O' || firstLetter === 'P') {
                    try {
                        if (!fs.existsSync(`${myPath}${fileName}/M-P`)) {
                          fs.mkdirSync(`${myPath}${fileName}/M-P`)
                        }
                        fs.renameSync(oldChildFilePath,`${myPath}${fileName}/M-P/${childFile}`)
                      } catch (err) {
                        console.error(err)
                      }
                }
                else if(firstLetter === 'Q' || firstLetter === 'R' || firstLetter === 'S' || firstLetter === 'T') {
                    try {
                        if (!fs.existsSync(`${myPath}${fileName}/Q-T`)) {
                          fs.mkdirSync(`${myPath}${fileName}/Q-T`)
                        }
                        fs.renameSync(oldChildFilePath,`${myPath}${fileName}/Q-T/${childFile}`)
                      } catch (err) {
                        console.error(err)
                      }
                }
                else if(firstLetter === 'U' || firstLetter === 'V' || firstLetter === 'W' || firstLetter === 'X') {
                    try {
                        if (!fs.existsSync(`${myPath}${fileName}/U-X`)) {
                          fs.mkdirSync(`${myPath}${fileName}/U-X`)
                        }
                        fs.renameSync(oldChildFilePath,`${myPath}${fileName}/U-X/${childFile}`)
                      } catch (err) {
                        console.error(err)
                      }
                }
                else {
                    try {
                        if (!fs.existsSync(`${myPath}${fileName}/Y-ZandOthers`)) {
                          fs.mkdirSync(`${myPath}${fileName}/Y-ZandOthers`)
                        }
                        fs.renameSync(oldChildFilePath,`${myPath}${fileName}/Y-ZandOthers/${childFile}`)
                      } catch (err) {
                        console.error(err)
                      }
                }
            }
        })
    }

    // If --type isn't exist 
    else {
      if(isFile(fileName) && option.indexOf('--n') != -1 && option.indexOf('--t') === -1) {

                const oldChildFilePath = path.join(myPath,fileName)
                console.log(oldChildFilePath)
                const firstLetter = fileName[0].toUpperCase()
                //console.log(firstLetter)
                if(firstLetter === 'A' || firstLetter === 'B' || firstLetter === 'C' || firstLetter === 'D')
                {
                    try {
                        if (!fs.existsSync(`${myPath}/A-D`)) {
                          fs.mkdirSync(`${myPath}/A-D`)
                        }
                        fs.copyFile(oldChildFilePath,`${myPath}/A-D/${fileName}`, err => {
                            if(err) throw err
                        })
                      } catch (err) {
                        console.error(err)
                      }
                }
                else if(firstLetter === 'E' || firstLetter === 'F' || firstLetter === 'G' || firstLetter === 'H') {
                    try {
                      if (!fs.existsSync(`${myPath}/E-H`)) {
                        fs.mkdirSync(`${myPath}/E-H`)
                    }
                    fs.copyFile(oldChildFilePath,`${myPath}/E-H/${fileName}`, err => {
                        if(err) throw err
                    })
                      } catch (err) {
                        console.error(err)
                      }
                }
                else if(firstLetter === 'I' || firstLetter === 'J' || firstLetter === 'K' || firstLetter === 'L') {
                    try {
                      if (!fs.existsSync(`${myPath}/I-L`)) {
                        fs.mkdirSync(`${myPath}/I-L`)
                    }
                    fs.copyFile(oldChildFilePath,`${myPath}/I-L/${fileName}`, err => {
                        if(err) throw err
                    })
                      } catch (err) {
                        console.error(err)
                      }
                }
                else if(firstLetter === 'M' || firstLetter === 'N' || firstLetter === 'O' || firstLetter === 'P') {
                    try {
                      if (!fs.existsSync(`${myPath}/M-P`)) {
                        fs.mkdirSync(`${myPath}/M-P`)
                    }
                    fs.copyFile(oldChildFilePath,`${myPath}/M-P/${fileName}`, err => {
                        if(err) throw err
                    })
                      } catch (err) {
                        console.error(err)
                      }
                }
                else if(firstLetter === 'Q' || firstLetter === 'R' || firstLetter === 'S' || firstLetter === 'T') {
                    try {
                      if (!fs.existsSync(`${myPath}/Q-T`)) {
                        fs.mkdirSync(`${myPath}/Q-T`)
                    }
                    fs.copyFile(oldChildFilePath,`${myPath}/Q-T/${fileName}`, err => {
                        if(err) throw err
                    })
                      } catch (err) {
                        console.error(err)
                      }
                }
                else if(firstLetter === 'U' || firstLetter === 'V' || firstLetter === 'W' || firstLetter === 'X') {
                    try {
                      if (!fs.existsSync(`${myPath}/U-X`)) {
                        fs.mkdirSync(`${myPath}/U-X`)
                    }
                    fs.copyFile(oldChildFilePath,`${myPath}/U-X/${fileName}`, err => {
                        if(err) throw err
                    })
                      } catch (err) {
                        console.error(err)
                      }
                }
                else {
                    try {
                      if (!fs.existsSync(`${myPath}/Y-ZandOthers`)) {
                        fs.mkdirSync(`${myPath}/Y-ZandOthers`)
                    }
                    fs.copyFile(oldChildFilePath,`${myPath}/Y-ZandOthers/${fileName}`, err => {
                        if(err) throw err
                    })
                      } catch (err) {
                        console.error(err)
                      }
                }
      }
    }
    })

    // Check size 
    fs.readdirSync(myPath).map(folder => {
      // If it's in Type folder

      if(isFolder(folder) && isTypeFolder(folder) && option.indexOf('--s') != -1) {
        fs.readdirSync(`${myPath}${folder}`).map(childFile => {

          // If it isn't in folder by Name
          if(isFile(folder + '/' + childFile)) {
            const oldChildFilePath = path.join(`${myPath}${folder}`,childFile)
            const originPath = path.join(myPath, childFile)
            const size = createSize(originPath)
            
            //console.log(createDate(originPath))

            // Very big
            if(size > (10*1024)) {
              if (!fs.existsSync(`${myPath}${folder}/VeryBig`)) {
                fs.mkdirSync(`${myPath}${folder}/VeryBig`)
              }
              fs.renameSync(oldChildFilePath,`${myPath}${folder}/VeryBig/${childFile}`)
            }
            else {
              // Big
              if(size >= (5*1024)) {
                if (!fs.existsSync(`${myPath}${folder}/Big`)) {
                  fs.mkdirSync(`${myPath}${folder}/Big`)
                }
                fs.renameSync(oldChildFilePath,`${myPath}${folder}/Big/${childFile}`)
              }

              else {
                // Medium
                if(size >= (1024)) {
                  if (!fs.existsSync(`${myPath}${folder}/Medium`)) {
                    fs.mkdirSync(`${myPath}${folder}/Medium`)
                  }
                  fs.renameSync(oldChildFilePath,`${myPath}${folder}/Medium/${childFile}`)
                }
                else {
                  // Small
                  if(size >= 100) {
                    if (!fs.existsSync(`${myPath}${folder}/Small`)) {
                      fs.mkdirSync(`${myPath}${folder}/Small`)
                    }
                    fs.renameSync(oldChildFilePath,`${myPath}${folder}/Small/${childFile}`)
                  }
                  
                  // Tiny
                  else {
                    if (!fs.existsSync(`${myPath}${folder}/Tiny`)) {
                      fs.mkdirSync(`${myPath}${folder}/Tiny`)
                    }
                    fs.renameSync(oldChildFilePath,`${myPath}${folder}/Tiny/${childFile}`)
                  }
                }
              }
            }
          }

          // If it is in folder by Name
          else if(option.indexOf('--n') != -1) {

            fs.readdirSync(`${myPath}${folder}/${childFile}`).map(cFile => {

              const oldChildFilePath = path.join(`${myPath}${folder}/${childFile}`,cFile)
              const originPath = path.join(myPath, childFile)
              const size = createSize(oldChildFilePath)
              
              //console.log(createDate(originPath))
              // console.log('----------------------------')
              // console.log(oldChildFilePath)
              // Very big
              if(size > (10*1024)) {
                if (!fs.existsSync(`${myPath}${folder}/${childFile}/VeryBig`)) {
                  fs.mkdirSync(`${myPath}${folder}/${childFile}/VeryBig`)
                }
                fs.renameSync(oldChildFilePath,`${myPath}${folder}/${childFile}/VeryBig/${cFile}`)
              }
              else {
                // Big
                if(size >= (5*1024)) {
                  if (!fs.existsSync(`${myPath}${folder}/${childFile}/Big`)) {
                    fs.mkdirSync(`${myPath}${folder}/${childFile}/Big`)
                  }
                  fs.renameSync(oldChildFilePath,`${myPath}${folder}/${childFile}/Big/${cFile}`)
                }
  
                else {
                  // Medium
                  if(size >= (1024)) {
                    if (!fs.existsSync(`${myPath}${folder}/${childFile}/Medium`)) {
                      fs.mkdirSync(`${myPath}${folder}/${childFile}/Medium`)
                    }
                    fs.renameSync(oldChildFilePath,`${myPath}${folder}/${childFile}/Medium/${cFile}`)
                  }
                  else {
                    // Small
                    if(size >= 100) {
                      if (!fs.existsSync(`${myPath}${folder}/${childFile}/Small`)) {
                        fs.mkdirSync(`${myPath}${folder}/${childFile}/Small`)
                      }
                      fs.renameSync(oldChildFilePath,`${myPath}${folder}/${childFile}/Small/${cFile}`)
                    }
                    
                    // Tiny
                    else {
                      if (!fs.existsSync(`${myPath}${folder}/${childFile}/Tiny`)) {
                        fs.mkdirSync(`${myPath}${folder}/${childFile}/Tiny`)
                      }
                      fs.renameSync(oldChildFilePath,`${myPath}${folder}/${childFile}/Tiny/${cFile}`)
                    }
                  }
                }
              }
            })
          }
        })
      }

      // If it isn't in Type folder
      if(isFile(folder) && option.indexOf('--t') ===-1 && option.indexOf('--s') != -1 && option.indexOf('--n') === -1) {
            const oldChildFilePath = path.join(myPath, folder)
            //const originPath = path.join(myPath, childFile)
            const size = createSize(oldChildFilePath)
            
            //console.log(createDate(originPath))

            // Very big
            if(size > (10*1024)) {
              if (!fs.existsSync(`${myPath}/VeryBig`)) {
                fs.mkdirSync(`${myPath}/VeryBig`)
              }
              fs.copyFile(oldChildFilePath,`${myPath}/VeryBig/${folder}`, err => {
                if(err) throw err
              })
            }
            else {
              // Big
              if(size >= (5*1024)) {
                if (!fs.existsSync(`${myPath}/Big`)) {
                  fs.mkdirSync(`${myPath}/Big`)
                }
                fs.copyFile(oldChildFilePath,`${myPath}/Big/${folder}`, err => {
                  if(err) throw err
                })
              }

              else {
                // Medium
                if(size >= (1024)) {
                  if (!fs.existsSync(`${myPath}/Medium`)) {
                    fs.mkdirSync(`${myPath}/Medium`)
                  }
                  fs.copyFile(oldChildFilePath,`${myPath}/Medium/${folder}`, err => {
                    if(err) throw err
                  })
                }
                else {
                  // Small
                  if(size >= 100) {
                    if (!fs.existsSync(`${myPath}/Small`)) {
                      fs.mkdirSync(`${myPath}/Small`)
                    }
                    fs.copyFile(oldChildFilePath,`${myPath}/Small/${folder}`, err => {
                      if(err) throw err
                    })
                  }
                  
                  // Tiny
                  else {
                    if (!fs.existsSync(`${myPath}/Tiny`)) {
                      fs.mkdirSync(`${myPath}/Tiny`)
                    }
                    fs.copyFile(oldChildFilePath,`${myPath}/Tiny/${folder}`, err => {
                      if(err) throw err
                    })
                  }
                }
              }
            }
      }
    })

    // Check time
    fs.readdirSync(myPath).map(fileName => {
      const cDay = date_ob.getDate()
      const cMonth = date_ob.getMonth()+1
      const cYear = date_ob.getFullYear()
      const oldFile = path.join(myPath,fileName)
        const createD = createDate(oldFile)
        const DateType = {
          year: +createD.slice(0,4),
          month: +createD.slice(5,7),
          day: +createD.slice(8,10)
        }
      // If only Modify
      if(isFile(fileName) && option.indexOf('--m') != -1 && option.indexOf('--t') === -1
      && option.indexOf('--n') ===-1 && option.indexOf('--s') ===-1) {
        //console.log(cDay,cMonth,cYear)
        //console.log(DateType)

        if(cYear === DateType.year) {
          if(cMonth === DateType.month) {
            if(cDay === DateType.day) {
              try {
                if (!fs.existsSync(`${myPath}/Today`)) {
                  fs.mkdirSync(`${myPath}/Today`)
                }
                fs.copyFile(oldFile,`${myPath}/Today/${fileName}`, err => {
                    if(err) throw err
                })
              } catch (err) {
                console.error(err)
              }
            }
            else {
              if(DateType.day === 24 && cDay === 25 || cDay ==26 || cDay ===27) {
                try {
                  if (!fs.existsSync(`${myPath}/ThisWeek`)) {
                    fs.mkdirSync(`${myPath}/ThisWeek`)
                  }
                  fs.copyFile(oldFile,`${myPath}/ThisWeek/${fileName}`, err => {
                      if(err) throw err
                  })
                } catch (err) {
                  console.error(err)
                }
              }
              else {
                try {
                  if (!fs.existsSync(`${myPath}/ThisMonth`)) {
                    fs.mkdirSync(`${myPath}/ThisMonth`)
                  }
                  fs.copyFile(oldFile,`${myPath}/ThisMonth/${fileName}`, err => {
                      if(err) throw err
                  })
                } catch (err) {
                  console.error(err)
                }
              }
            }
          }
          else {
            try {
              if (!fs.existsSync(`${myPath}/ThisYear`)) {
                fs.mkdirSync(`${myPath}/ThisYear`)
              }
              fs.copyFile(oldFile,`${myPath}/ThisYear/${fileName}`, err => {
                  if(err) throw err
              })
            } catch (err) {
              console.error(err)
            }
          }
        }
      }

      // If exist another option
      else if(isFolder(fileName) && isTypeFolder(fileName) && option.indexOf('--m') != -1) {
        fs.readdirSync(`${myPath}/${fileName}`).map(childFile1 => {
          oldChildFile1 = path.join(`${myPath}/${fileName}`,childFile1)
          
          if(isFolder(fileName + '/' + childFile1)) {
            fs.readdirSync(`${myPath}/${fileName}/${childFile1}`).map(childFile2 => {
              oldChildFile2 = path.join(`${myPath}/${fileName}/${childFile1}`,childFile2)

              // Modify with full options
              if(isFolder(fileName + '/' + childFile1 + '/' + childFile2)) {
                fs.readdirSync(`${myPath}/${fileName}/${childFile1}/${childFile2}`).map(childFile3 => {
                  oldChildFile3 = path.join(`${myPath}/${fileName}/${childFile1}/${childFile2}`,childFile3)

                  if(cYear === DateType.year) {
                    if(cMonth === DateType.month) {
                      if(cDay === DateType.day) {
                        try {
                          if (!fs.existsSync(`${myPath}/${fileName}/${childFile1}/${childFile2}/Today`)) {
                            fs.mkdirSync(`${myPath}/${fileName}/${childFile1}/${childFile2}/Today`)
                          }
                          fs.renameSync(oldChildFile3,`${myPath}/${fileName}/${childFile1}/${childFile2}/Today/${childFile3}`, err => {
                              if(err) throw err
                          })
                        } catch (err) {
                          console.error(err)
                        }
                      }
                      else {
                        if(DateType.day === 24 && cDay === 25 || cDay ==26 || cDay ===27) {
                          try {
                            if (!fs.existsSync(`${myPath}/${fileName}/${childFile1}/${childFile2}/ThisWeek`)) {
                              fs.mkdirSync(`${myPath}/${fileName}/${childFile1}/${childFile2}/ThisWeek`)
                            }
                            fs.renameSync(oldChildFile3,`${myPath}/${fileName}/${childFile1}/${childFile2}/ThisWeek/${childFile3}`, err => {
                                if(err) throw err
                            })
                          } catch (err) {
                            console.error(err)
                          }
                        }
                        else {
                          try {
                            if (!fs.existsSync(`${myPath}/${fileName}/${childFile1}/${childFile2}/ThisMonth`)) {
                              fs.mkdirSync(`${myPath}/${fileName}/${childFile1}/${childFile2}/ThisMonth`)
                            }
                            fs.renameSync(oldChildFile3,`${myPath}/${fileName}/${childFile1}/${childFile2}/ThisMonth/${childFile3}`, err => {
                                if(err) throw err
                            })
                          } catch (err) {
                            console.error(err)
                          }
                        }
                      }
                    }
                    else {
                      try {
                        if (!fs.existsSync(`${myPath}/${fileName}/${childFile1}/${childFile2}/ThisYear`)) {
                          fs.mkdirSync(`${myPath}/${fileName}/${childFile1}/${childFile2}/ThisYear`)
                        }
                        fs.renameSync(oldChildFile3,`${myPath}/${fileName}/${childFile1}/${childFile2}/ThisYear/${childFile3}`, err => {
                            if(err) throw err
                        })
                      } catch (err) {
                        console.error(err)
                      }
                    }
                  }
                })
              }
              
              // Modify with 2 other options
              else {
                if(cYear === DateType.year) {
                  if(cMonth === DateType.month) {
                    if(cDay === DateType.day) {
                      try {
                        if (!fs.existsSync(`${myPath}/${fileName}/${childFile1}/Today`)) {
                          fs.mkdirSync(`${myPath}/${fileName}/${childFile1}/Today`)
                        }
                        fs.renameSync(oldChildFile2,`${myPath}/${fileName}/${childFile1}/Today/${childFile2}`, err => {
                            if(err) throw err
                        })
                      } catch (err) {
                        console.error(err)
                      }
                    }
                    else {
                      if(DateType.day === 24 && cDay === 25 || cDay ==26 || cDay ===27) {
                        try {
                          if (!fs.existsSync(`${myPath}/${fileName}/${childFile1}/ThisWeek`)) {
                            fs.mkdirSync(`${myPath}/${fileName}/${childFile1}/ThisWeek`)
                          }
                          fs.renameSync(oldChildFile2,`${myPath}/${fileName}/${childFile1}/ThisWeek/${childFile2}`, err => {
                              if(err) throw err
                          })
                        } catch (err) {
                          console.error(err)
                        }
                      }
                      else {
                        try {
                          if (!fs.existsSync(`${myPath}/${fileName}/${childFile1}/ThisMonth`)) {
                            fs.mkdirSync(`${myPath}/${fileName}/${childFile1}/ThisMonth`)
                          }
                          fs.renameSync(oldChildFile2,`${myPath}/${fileName}/${childFile1}/ThisMonth/${childFile2}`, err => {
                              if(err) throw err
                          })
                        } catch (err) {
                          console.error(err)
                        }
                      }
                    }
                  }
                  else {
                    try {
                      if (!fs.existsSync(`${myPath}/${fileName}/${childFile1}/ThisYear`)) {
                        fs.mkdirSync(`${myPath}/${fileName}/${childFile1}/ThisYear`)
                      }
                      fs.renameSync(oldChildFile2,`${myPath}/${fileName}/${childFile1}/ThisYear/${childFile2}`, err => {
                          if(err) throw err
                      })
                    } catch (err) {
                      console.error(err)
                    }
                  }
                }
              }
            })
          }
          // Modify with 1 other option
          else {
            if(cYear === DateType.year) {
              if(cMonth === DateType.month) {
                if(cDay === DateType.day) {
                  try {
                    if (!fs.existsSync(`${myPath}/${fileName}/Today`)) {
                      fs.mkdirSync(`${myPath}/${fileName}/Today`)
                    }
                    fs.renameSync(oldChildFile1,`${myPath}/${fileName}/Today/${childFile1}`, err => {
                        if(err) throw err
                    })
                  } catch (err) {
                    console.error(err)
                  }
                }
                else {
                  if(DateType.day === 24 && cDay === 25 || cDay ==26 || cDay ===27) {
                    try {
                      if (!fs.existsSync(`${myPath}/${fileName}/ThisWeek`)) {
                        fs.mkdirSync(`${myPath}/${fileName}/ThisWeek`)
                      }
                      fs.renameSync(oldChildFile1,`${myPath}/${fileName}/ThisWeek/${childFile1}`, err => {
                          if(err) throw err
                      })
                    } catch (err) {
                      console.error(err)
                    }
                  }
                  else {
                    try {
                      if (!fs.existsSync(`${myPath}/${fileName}/ThisMonth`)) {
                        fs.mkdirSync(`${myPath}/${fileName}/ThisMonth`)
                      }
                      fs.renameSync(oldChildFile1,`${myPath}/${fileName}/ThisMonth/${childFile1}`, err => {
                          if(err) throw err
                      })
                    } catch (err) {
                      console.error(err)
                    }
                  }
                }
              }
              else {
                try {
                  if (!fs.existsSync(`${myPath}/${fileName}/ThisYear`)) {
                    fs.mkdirSync(`${myPath}/${fileName}/ThisYear`)
                  }
                  fs.renameSync(oldChildFile1,`${myPath}/${fileName}/ThisYear/${childFile1}`, err => {
                      if(err) throw err
                  })
                } catch (err) {
                  console.error(err)
                }
              }
            }
          }
        })
      }

    })
    

    console.log('Successfully!')
} else {
    console.error("Please enter a valid input");
}


