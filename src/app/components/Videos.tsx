import React from 'react';

interface VideosProps {
    videos:any[];
}

const Videos = ({videos} : VideosProps) => {
  return (
    <div className="overflow-x-auto">
      <div className="flex flex-row gap-5 flex-nowrap  mt-5">
        {videos.map((value: any) => (
          <iframe
            key={value.id}
            className="w-[500px] h-[300px] rounded-xl"
            src={`https://www.youtube.com/embed/${value.key}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ))}
      </div>
    </div>
  );
};

export default Videos;
