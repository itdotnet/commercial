'use client'

import { useCallback, Dispatch, SetStateAction, startTransition } from 'react'
import { useDropzone } from '@uploadthing/react/hooks'
import { generateClientDropzoneAccept } from 'uploadthing/client'

import { Button } from '@/components/ui/button'
import { convertFileToUrl } from '@/lib/utils'
import Image from 'next/image'
import axios from 'axios';

type FileUploaderProps = {
    onFieldChange: (url: string) => void
    imageUrl: string,
    setFiles: Dispatch<SetStateAction<File[]>>
}

export function FileUploader({ imageUrl, onFieldChange, setFiles }: FileUploaderProps) {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(acceptedFiles)
        onFieldChange(convertFileToUrl(acceptedFiles[0]))
    }, [])

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: generateClientDropzoneAccept(['image/*']),
    })

    const handleDeleteImage = async () => {
        await axios.delete("/api/uploadthing", {
            data: {
                url: imageUrl.substring(imageUrl.lastIndexOf("/") + 1),
            },
        }).then(res => {
            if (res.data.success)
                onFieldChange('');
        });
    }

    return (
        <div
            {...(!imageUrl && getRootProps())}
            className={`flex-center bg-dark-3 flex h-72 flex-col overflow-hidden rounded-xl bg-grey-50 ${!imageUrl?'cursor-pointer':''}`}>
            <input {...getInputProps()} className={!imageUrl?'cursor-pointer':''}/>
            {imageUrl ? (
                <div className="relative flex w-full flex-1 justify-center overflow-hidden">
                    <img
                        src={imageUrl}
                        alt="image"
                        width={250}
                        height={250}
                        className="w-full object-cover object-center"
                    />
                    <div onClick={()=>startTransition(handleDeleteImage)} className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all cursor-pointer">
                        <Image className='z-50' src="/assets/icons/delete.svg" alt="edit" width={20} height={20} />
                    </div>
                </div>
            ) : (
                <div className="flex-center flex-col py-5 text-grey-500">
                    <img src="/assets/icons/upload.svg" width={77} height={77} alt="file upload" />
                    <h3 className="mb-2 mt-2">Drag photo here</h3>
                    <p className="p-medium-12 mb-4">SVG, PNG, JPG</p>
                    <Button type="button" className="rounded-full">
                        Select from computer
                    </Button>
                </div>
            )}
        </div>
    )
}