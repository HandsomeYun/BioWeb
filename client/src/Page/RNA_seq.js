import React from 'react';
import GlobalHeader from '../components/globalHeader'

function RNA_seq_Page(){
    return(
        <>
            <div id="header">
                <GlobalHeader page={{ text: 'RNAseq' }}/>
            </div>
            <iframe
                //src="https://whitematterdatapage.com/"
                src="https://whitematterdatapage.com//"
                style={{width: '100%', height: '600px', border: 'none'}}
                title="WhiteMatterWiki Embedded Page">
            </iframe>
        </>
    )
}

export default RNA_seq_Page