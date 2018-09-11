<?php
/**
 * Created by PhpStorm.
 * User: webby
 * Date: 11/09/2018
 * Time: 2:50 PM
 */

namespace App\Service;


use Symfony\Component\HttpFoundation\File\UploadedFile;

class ImageUploader
{

    public function uploadImageToCloudinary(UploadedFile $file)
    {
        $fileName = $file->getRealPath();

        \Cloudinary::config([
           "ccloud_name" => getenv('CLOUD_NAME'),
           'api_key' => getenv('API_KEY'),
           "api_secret" =>  getenv('API_SECRET')
        ]);

        $imageUploaded = \Cloudinary\Uploader::upload($fileName, [
           'folder' => 'realcodeblog'
        ]);

        return $imageUploaded['secure_url'];
    }

}