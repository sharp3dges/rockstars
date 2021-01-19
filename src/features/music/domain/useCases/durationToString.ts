const durationToString = (value: number): string => {
    const duration = value / 1000;
    const hrs = ~~(duration / 3600);
    const mins = ~~((duration % 3600) / 60);
    const secs = ~~duration % 60;

    let ret = '';
    if (hrs > 0) {
        ret += `${hrs}:${mins < 10 ? '0' : ''}`;
    }

    ret += `${mins}:${secs < 10 ? '0' : ''}`;
    ret += secs.toString();
    return ret;
};

export default durationToString;
