import React from 'react';
import RoundButton from '../roundButton/RoundButton';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';

import './HistoryItem.css'

const HistoryItem = ({id, location, time, handleSearch, handleDelete, fullList, iconSize}) => {
    
    return(
        <div className='historyItemContainer'>
            <div className='historyItemLeftContainer'>
                <p>{location}</p>
                
            </div>

            <div className='historyItemRightContainer'>
              
                <p>{time}</p>
                
                <div className='historyRoundButtonContainer'>
                        <RoundButton 
                            buttonIcon={<SearchIcon sx={{fontSize: iconSize}}/>}
                            handleOnClick={handleSearch}
                            value={location ?? location}
                        />
                </div>

                <div className='historyRoundButtonContainer'>
                        <RoundButton 
                            buttonIcon={<DeleteIcon sx={{fontSize: iconSize}}/>}
                            handleOnClick={handleDelete}
                            value={id ?? id}
                            list={fullList ?? fullList}
                        />

                </div>

            </div>
        </div>
    )
}

export default HistoryItem