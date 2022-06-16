import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  viewBranches,
  viewStash,
  deleteBranch,
  createBranch,
  mergeBranch,
  selectBranch,
  createStash,
  deleteStash,
  selectStash,
  resetBranch
} from './projectGitActions';
import Text from 'components/atoms/Form/Text';
import Button from 'components/atoms/Button';
import {
  SCProjectGitPageWrapper,
  SCNameTxt,
  SCBranchesWrapper,
  SCBranchBtnWrapper,
  SCProjectGitBtnWrapper
} from './styles';

const ProjectGit = ({ root }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const { branches, stashes } = useSelector((state) => state.project);

  return (
    <SCProjectGitPageWrapper>
      <SCBranchesWrapper>
        <SCBranchBtnWrapper>
          <h2>Branches</h2>
          {branches.map((item) => {
            return (
              <Button
                isPrimary
                key={item}
                label={item}
                onClick={() => {
                  setName(item);
                }}
              />
            );
          })}
        </SCBranchBtnWrapper>
        <SCBranchBtnWrapper>
          <h2>Stashes</h2>
          {stashes.map((item) => {
            return (
              <Button
                isPrimary
                key={item}
                label={item}
                onClick={() => {
                  setName(item);
                }}
              />
            );
          })}
        </SCBranchBtnWrapper>
      </SCBranchesWrapper>
      <div>
        <SCNameTxt>
          <Text
            placeholder="Name"
            selected={name}
            onChange={({ selected }) => {
              setName(selected);
            }}
          />
        </SCNameTxt>
        <SCProjectGitBtnWrapper>
          <Button
            label="Checkout"
            disabled={!name}
            onClick={() => {
              dispatch(selectBranch(root, name));
            }}
          />
          <Button
            label="Delete"
            disabled={!name}
            onClick={() => {
              dispatch(deleteBranch(root, name));
              dispatch(viewBranches(root));
            }}
          />
          <Button
            label="Merge"
            disabled={!name}
            onClick={() => {
              dispatch(mergeBranch(root, name));
            }}
          />
          <Button
            label="Create"
            disabled={!name}
            onClick={() => {
              dispatch(createBranch(root, name));
              dispatch(viewBranches(root));
            }}
          />
        </SCProjectGitBtnWrapper>
        <SCProjectGitBtnWrapper>
          <Button
            label="Create Stash"
            disabled={!name}
            onClick={() => {
              dispatch(createStash(root, name));
              dispatch(viewStash(root));
            }}
          />
          <Button
            label="Delete Stash"
            disabled={!name}
            onClick={() => {
              dispatch(
                deleteStash(
                  root,
                  stashes.findIndex((item) => item === name)
                )
              );
              dispatch(viewStash(root));
            }}
          />
          <Button
            label="Switch Stash"
            disabled={!name}
            onClick={() => {
              dispatch(selectStash(root, name));
            }}
          />
        </SCProjectGitBtnWrapper>
        <SCProjectGitBtnWrapper>
          <Button
            label="Reset"
            onClick={() => {
              dispatch(resetBranch(root));
            }}
          />
        </SCProjectGitBtnWrapper>
      </div>
    </SCProjectGitPageWrapper>
  );
};

export default ProjectGit;
