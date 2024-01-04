import child_process from 'child_process';

/**
 * @file 添加、删除注册列表的key值
 */

const deleteKey = (keyPath: string, value: string) => {
    let cmd = `reg delete ${keyPath} /v ${value} /f`
    return child_process.execSync(cmd);
}

const addKey = (keyPath: string, name: string, value: string) => {
    let cmd = `reg add "${keyPath}" /v "${name}" /t REG_SZ /d "${value}" /f`
    return child_process.execSync(cmd);
}

const queryKey = (keyPath: string, name: string):string => {
    let cmd = `reg query "${keyPath}" /v "${name}"`
    return child_process.execSync(cmd, {encoding: "utf8"});
}


export {
    deleteKey,
    addKey,
    queryKey
}
