import React, { useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form';

export default function RTE({name, control, label, defaultValue =""}) {
    const editorRef = useRef(null);
    return (
        <div>
            {label && <label className='inline-block mb-1 pl-1 text-zinc-200'>{label}</label>}

            <Controller
                name={name || "content"}
                control={control}
                render={({ field: { onChange } }) => (
                    <Editor
                        apiKey='foimg6f49k5dvdrzelnacqbfw3fcykghknhjoc8lxzj2tcvg'
                        onInit={(_evt, editor) => editorRef.current = editor}
                        initialValue={defaultValue}
                        init={{
                            height: 300,
                            menubar: false,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                            ],
                            toolbar: 'undo redo | blocks | ' +
                                'bold italic forecolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; }'
                        }}
                        onEditorChange={onChange}
                    />
                )}

            />
            

        </div>
    )
}
